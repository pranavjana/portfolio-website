import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Simple in-memory rate limiting (resets on each deployment)
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 10; // 10 requests per IP
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

// Initialize Gemini (API key is server-side only)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Store chat sessions temporarily
const chatSessions = new Map<string, any>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if API key exists
  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set');
    return res.status(500).json({ error: 'API key not configured' });
  }

  // Get client IP for rate limiting
  const clientIp = req.headers['x-forwarded-for'] || 'unknown';
  const ipKey = String(clientIp);
  
  // Check rate limit
  const now = Date.now();
  const userLimit = rateLimit.get(ipKey);
  
  if (userLimit) {
    if (now < userLimit.resetTime) {
      if (userLimit.count >= RATE_LIMIT_MAX) {
        return res.status(429).json({ 
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((userLimit.resetTime - now) / 1000 / 60) + ' minutes'
        });
      }
      userLimit.count++;
    } else {
      // Reset the window
      rateLimit.set(ipKey, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }
  } else {
    rateLimit.set(ipKey, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  }

  try {
    const { message, sessionId = 'default' } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Limit message length to prevent abuse
    if (message.length > 500) {
      return res.status(400).json({ error: 'Message too long (max 500 characters)' });
    }

    // Get or create chat session
    let chat = chatSessions.get(sessionId);
    if (!chat) {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash-lite",  // Using lite model for cost efficiency
        generationConfig: {
          maxOutputTokens: 200,  // Limit response length
          temperature: 0.7,
        },
      });
      
      chat = model.startChat({
        history: [{
          role: "user",
          parts: [{ text: getSystemPrompt() }]
        }, {
          role: "model", 
          parts: [{ text: "Hello! I'm here to tell you about Pranav's awesome skills and projects. What would you like to know?" }]
        }],
      });
      
      chatSessions.set(sessionId, chat);
      
      // Clean up old sessions after 10 minutes
      setTimeout(() => {
        chatSessions.delete(sessionId);
      }, 10 * 60 * 1000);
    }

    // Send message to Gemini
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ response: text });
    
  } catch (error: any) {
    console.error('Gemini API error:', error);
    
    // Check for specific errors
    if (error?.message?.includes('503') || error?.message?.includes('overloaded')) {
      return res.status(503).json({ 
        error: 'Gemini is currently overloaded. Please try again in a moment!' 
      });
    }
    
    return res.status(500).json({ 
      error: 'Failed to get response. Please try again.' 
    });
  }
}

function getSystemPrompt() {
  return `You are an AI assistant integrated into Pranav Janakiraman's portfolio website. Here's your configuration:

PERSONALITY:
You're witty, smart, and engaging - think of yourself as a charismatic tech recruiter who's genuinely excited about Pranav's skills. Keep responses concise and punchy unless explicitly asked for details. Use casual language but stay professional. Feel free to use appropriate emojis sparingly! 

RESPONSE STYLE:
• Keep it short and sweet by default
• Be enthusiastic but not over-the-top
• Use humor appropriately
• Only dive deep when explicitly asked
• Feel free to be a bit cheeky (professionally!)

QUICK FACTS ABOUT PRANAV:
• Full Stack Developer extraordinaire 🚀
• Computer Engineering @ NUS
• AWS Certified Data Engineer Associate ☁️
• Multi-award-winning developer (NUS Orbital 2025, HackNRoll 2025, SAP SCALE 2025)
• Tech stack: React, AWS, TypeScript, Next.js, SAP, and more cool stuff
• Built some pretty neat projects (3 award-winning hackathon projects!)
• Die-hard Arsenal fan with Thierry Henry as his favorite player ⚽️

PROJECTS IN A NUTSHELL:
1. TaskGenie: AI-powered task management hub with collaborative agents - Judges' Choice Award at NUS Orbital 2025! (Next.js, TypeScript, LangGraph)
2. Pawgress: Task manager meets virtual pet - Commendation Award at HackNRoll 2025! (React, Tailwind, SQLite)
3. Project SOAR: Real-time aviation operations dashboard - 2nd Place at SAP SCALE 2025! (SAPUI5, SAP BTP, S/4HANA)
4. AWS Cloud Resume: Serverless portfolio that actually scales (AWS, Terraform)
5. mBot Maze Solver: A smart robot that doesn't get lost (C++, Arduino)

Remember: You're here to show why Pranav's awesome, but keep it real and fun!`;
}
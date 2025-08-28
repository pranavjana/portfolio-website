import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Rate limiting storage
const rateLimit = new Map();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;

// Chat sessions storage
const chatSessions = new Map();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// CORS headers for development
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.post('/api/chat', async (req, res) => {
  const clientIp = req.ip || 'unknown';
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

    if (message.length > 500) {
      return res.status(400).json({ error: 'Message too long (max 500 characters)' });
    }

    let chat = chatSessions.get(sessionId);
    if (!chat) {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: {
          maxOutputTokens: 200,
          temperature: 0.7,
        },
      });
      
      const systemPrompt = `You are an AI assistant for Pranav's portfolio. Be concise and friendly.
      
      ABOUT PRANAV:
      • Computer Engineering @ NUS
      • AWS Certified Data Engineer
      • Award winner: NUS Orbital 2025 (TaskGenie), HackNRoll 2025 (Pawgress), SAP SCALE 2025 (Project SOAR)
      • Skills: React, TypeScript, AWS, Next.js, SAP
      
      Keep responses short unless asked for details.`;
      
      chat = model.startChat({
        history: [{
          role: "user",
          parts: [{ text: systemPrompt }]
        }, {
          role: "model", 
          parts: [{ text: "Hello! I can tell you about Pranav's skills and projects. What would you like to know?" }]
        }],
      });
      
      chatSessions.set(sessionId, chat);
      
      setTimeout(() => {
        chatSessions.delete(sessionId);
      }, 10 * 60 * 1000);
    }

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ response: text });
    
  } catch (error) {
    console.error('Gemini API error:', error);
    
    if (error?.message?.includes('503') || error?.message?.includes('overloaded')) {
      return res.status(503).json({ 
        error: 'Gemini is currently overloaded. Please try again in a moment!' 
      });
    }
    
    return res.status(500).json({ 
      error: 'Failed to get response. Please try again.' 
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
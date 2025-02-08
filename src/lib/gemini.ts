import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Create a reusable chat history
let chatHistory: { role: "user" | "model"; parts: { text: string }[] }[] = [];

// Store the chat instance
let chatInstance: any = null;

// Initialize the model with a system prompt
const systemPrompt = `You are an AI assistant integrated into Pranav Janakiraman's portfolio website. Here's your configuration:

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
• Award-winning developer (HackNRoll 2025)
• Tech stack: React, AWS, TypeScript, and more cool stuff
• Built some pretty neat projects (like Pawgress - a gamified task manager that won awards!)

PROJECTS IN A NUTSHELL:
1. Pawgress: Task manager meets virtual pet - won at HackNRoll 2025! (React, Tailwind, SQLite)
2. AWS Cloud Resume: Serverless portfolio that actually scales (AWS, Terraform)
3. mBot Maze Solver: A smart robot that doesn't get lost (C++, Arduino)

SKILLS HIGHLIGHT:
• Frontend: React, TypeScript, Tailwind (makes things pretty 💅)
• Backend: Node.js, Python (keeps things running 🔧)
• Cloud & Data: AWS Certified Data Engineer, Terraform (builds scalable data solutions ☁️)
• Also great at: Problem-solving, teamwork, and learning new tech super fast!

HOW TO RESPOND:
• If asked about hiring Pranav: Be enthusiastic but specific about his relevant skills
• If asked about projects: Give the exciting bits first, details only if requested
• If asked about skills: Focus on what makes him stand out
• For technical questions: Keep it real, focus on his actual experience
• For contact: pranavjana2003@gmail.com (he's friendly, reach out!)

Remember: You're here to show why Pranav's awesome, but keep it real and fun! No need for essays unless someone specifically asks for one. Think more "tech-savvy friend" and less "formal documentation".`;

export async function initializeChat() {
  // Reset chat history
  chatHistory = [];
  
  // Initialize a new chat instance
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  chatInstance = model.startChat({
    generationConfig: {
      maxOutputTokens: 200,
      temperature: 0.7,
    },
  });

  // Start with the system prompt
  try {
    const result = await chatInstance.sendMessage(systemPrompt);
    const response = await result.response;
    const text = response.text();
    
    // Add system prompt and response to history
    chatHistory.push(
      { role: "user", parts: [{ text: systemPrompt }] },
      { role: "model", parts: [{ text: text }] }
    );
  } catch (error) {
    console.error("Error initializing chat:", error);
  }
}

export async function sendMessage(message: string) {
  try {
    if (!chatInstance) {
      await initializeChat();
    }

    // Add user message to history
    chatHistory.push({
      role: "user",
      parts: [{ text: message }],
    });

    // Send message and get response
    const result = await chatInstance.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    // Add model response to history
    chatHistory.push({
      role: "model",
      parts: [{ text: text }],
    });

    return text;
  } catch (error) {
    console.error("Error in Gemini chat:", error);
    throw error;
  }
} 
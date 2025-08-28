// Secure client-side chat API that calls our backend
let sessionId: string | null = null;

export async function initializeChat() {
  // Generate a unique session ID for this chat
  sessionId = Math.random().toString(36).substring(7);
}

export async function sendMessage(message: string): Promise<string> {
  try {
    // Initialize if needed
    if (!sessionId) {
      initializeChat();
    }

    // Call our secure backend API
    // In development, call localhost:3001, in production use /api/chat
    const apiUrl = import.meta.env.DEV 
      ? 'http://localhost:3001/api/chat'
      : '/api/chat';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        sessionId
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle rate limiting
      if (response.status === 429) {
        throw new Error(`Rate limited: ${data.retryAfter || 'Please try again later'}`);
      }
      // Handle overload
      if (response.status === 503) {
        throw new Error('503: Gemini is overloaded');
      }
      throw new Error(data.error || 'Failed to get response');
    }

    return data.response;
  } catch (error) {
    console.error("Error in chat API:", error);
    throw error;
  }
}
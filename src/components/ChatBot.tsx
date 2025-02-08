import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { initializeChat, sendMessage } from "@/lib/gemini";
import ReactMarkdown from "react-markdown";

interface Message {
  content: string;
  isBot: boolean;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      initializeChat();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, { content: userMessage, isBot: false }]);

    try {
      // Get bot response
      const response = await sendMessage(userMessage);
      setMessages(prev => [...prev, { content: response, isBot: true }]);
    } catch (error) {
      console.error("Error getting response:", error);
      setMessages(prev => [
        ...prev,
        { content: "Sorry, I encountered an error. Please try again.", isBot: true }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white dark:bg-black rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-black">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <h3 className="font-semibold">Pranav Support</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-2 text-gray-500 dark:text-gray-400">
                  <div className="h-12 w-12 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                    🤖
                  </div>
                  <h4 className="font-medium">Send a message to start the chat!</h4>
                  <p className="text-sm">
                    You can ask the bot anything about me and it will help to find the relevant information!
                  </p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex gap-2 max-w-[80%]",
                      message.isBot ? "self-start" : "self-end flex-row-reverse"
                    )}
                  >
                    {message.isBot && (
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        🤖
                      </div>
                    )}
                    <div
                      className={cn(
                        "rounded-lg p-3",
                        message.isBot
                          ? "bg-gray-100 dark:bg-gray-800"
                          : "bg-primary text-primary-foreground"
                      )}
                    >
                      {message.isBot ? (
                        <ReactMarkdown
                          className="prose dark:prose-invert prose-sm max-w-none"
                          components={{
                            // Override default elements with custom styling
                            h3: ({ children }) => <h3 className="font-bold text-base mb-2">{children}</h3>,
                            ul: ({ children }) => <ul className="list-disc ml-4 space-y-1">{children}</ul>,
                            li: ({ children }) => <li className="text-sm">{children}</li>,
                            p: ({ children }) => <p className="text-sm mb-2 last:mb-0">{children}</p>,
                            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="self-start flex gap-2 items-center text-sm text-gray-500 dark:text-gray-400">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    🤖
                  </div>
                  <div className="flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask something..."
                  className="flex-1 rounded-full px-4 py-2 bg-gray-100 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full"
                  disabled={!input.trim() || isLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
} 

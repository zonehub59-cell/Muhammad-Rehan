import React, { useState, useEffect, useRef } from 'react';
import { Chat } from '@google/genai';
import { ai } from './services/geminiService';
import { Message, Sender } from './types';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';

const App: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: `bot-${Date.now()}`,
      text: "Hello! I'm Malik Rehan, your friendly AI assistant. How can I help you today?",
      sender: Sender.BOT,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
    });
    setChat(chatSession);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (userInput: string) => {
    if (!chat) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: userInput,
      sender: Sender.USER,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const response = await chat.sendMessage({ message: userInput });
      const botResponseText = response.text;
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: botResponseText,
        sender: Sender.BOT,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

    } catch (error) {
      console.error("Gemini API error:", error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "Sorry, something went wrong. Please try again.",
        sender: Sender.BOT,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const bgPatternStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4e4e3' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-stone-200" style={bgPatternStyle}>
      <ChatHeader />
      <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col space-y-2">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}
        </div>
      </div>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;

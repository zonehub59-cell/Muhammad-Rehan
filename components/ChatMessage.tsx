
import React from 'react';
import { Message, Sender } from '../types';

interface ChatMessageProps {
  message: Message;
}

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${className}`} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);


const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === Sender.USER;

  const bubbleClasses = isUser
    ? 'bg-emerald-500 text-white self-end'
    : 'bg-white text-gray-800 self-start';
  
  const containerClasses = isUser ? 'justify-end' : 'justify-start';

  return (
    <div className={`flex ${containerClasses} my-1`}>
      <div className={`rounded-xl px-4 py-2 max-w-sm md:max-w-md lg:max-w-lg shadow-sm ${bubbleClasses}`}>
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        <div className={`flex items-center mt-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <span className={`text-xs ${isUser ? 'text-emerald-100' : 'text-gray-400'}`}>{message.timestamp}</span>
            {isUser && <CheckIcon className="ml-1 text-blue-300" />}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

import React from 'react';

const BotAvatar: React.FC = () => (
    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <path d="M12 12m-5 0a5 5 0 1 0 10 0 5 5 0 1 0-10 0"/>
        </svg>
    </div>
);

const ChatHeader: React.FC = () => {
  return (
    <div className="flex items-center p-3 border-b border-gray-300 bg-gray-100 sticky top-0 z-10">
      <BotAvatar />
      <div className="ml-4">
        <p className="text-lg font-semibold text-gray-800">Malik Rehan Chatbot</p>
        <p className="text-sm text-green-600">Online</p>
      </div>
    </div>
  );
};

export default ChatHeader;
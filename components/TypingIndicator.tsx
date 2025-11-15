
import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start my-1">
      <div className="bg-white text-gray-800 self-start rounded-xl px-4 py-3 shadow-sm">
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;

import React from "react";

type Props = {
  message: string;
  sender: string;
  isMyOwnMessage?: boolean;
};

const ChatMessage = ({ message, sender, isMyOwnMessage }: Props) => {
  const isSystemMessage = sender === "system";

  return (
    <div
      className={`flex mb-3 ${
        isSystemMessage
          ? "justify-center"
          : isMyOwnMessage
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isSystemMessage
            ? "bg-gray-800 text-white text-center text-xs"
            : isMyOwnMessage
            ? "bg-blue-500 text-white"
            : "bg-white text-black"
        }`}
      >
        {!isSystemMessage && (
          <p
            className={`text-sm font-bold mb-1 ${
              isMyOwnMessage ? "text-end" : ""
            }`}
          >
            {isMyOwnMessage ? "You" : sender}
          </p>
        )}
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;

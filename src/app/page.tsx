"use client";
import Chatform from "@/components/Chatform";
import ChatMessage from "@/components/ChatMessage";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socketClient";

type messages = {
  sender: string;
  message: string;
};

export default function Home() {
  const [messages, setMessages] = useState<messages[]>([]);
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    socket.on("message", (msg: messages) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("user-joined", (msg: string) => {
      setMessages((prev) => [...prev, { sender: "system", message: msg }]);
    });

    return () => {
      socket.off("user-joined");
      socket.off("message");
    };
  }, [username]);

  const handleJoinRoom = () => {
    if (room && username) {
      socket.emit("join-room", { room, username });
      setJoined(true);
    }
  };

  const handleSendMessage = (message: string) => {
    const msg = { room, message, sender: username };
    socket.emit("message", msg);
  };

  return (
    <div className="flex mt-24 justify-center w-full">
      {!joined ? (
        <div>
          <h1 className="mb-4 text-2xl font-bold">Join a room</h1>
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full border border-gray-300 rounded p-2 mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter room name"
            className="w-full border border-gray-300 rounded p-2 mb-4"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleJoinRoom}
          >
            Join
          </button>
        </div>
      ) : (
        <div className="w-full max-w-3xl mx-auto">
          <h1 className="mb-4 text-2xl font-bold">Room: {room}</h1>
          <div className="bg-gray-200 h-[500px] overflow-y-auto p-4 mb-4 border border-gray-300 rounded">
            {messages.map((msg, index) => {
              return (
                <ChatMessage
                  key={index}
                  message={msg.message}
                  sender={msg.sender}
                  isMyOwnMessage={msg.sender === username}
                />
              );
            })}
          </div>
          <Chatform onSendMessage={handleSendMessage} />
        </div>
      )}
    </div>
  );
}

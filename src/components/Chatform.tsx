import { useState } from "react";

type Props = {
  onSendMessage: (message: string) => void;
};

const Chatform = ({ onSendMessage }: Props) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
      <input
        type="text"
        placeholder="Enter your message"
        className="w-full border border-gray-300 rounded p-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        Send
      </button>
    </form>
  );
};

export default Chatform;

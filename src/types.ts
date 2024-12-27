// types/index.ts
export type Message = {
  sender: string;
  message: string;
  timestamp: number;
  id: string;
};

export type User = {
  username: string;
  isTyping: boolean;
};

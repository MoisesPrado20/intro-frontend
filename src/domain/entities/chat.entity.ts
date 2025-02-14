import { UserChat } from "./user.entity";

export interface Chat {
  id: string;
  type: "individual" | "group";
  name: string;
  participants: UserChat[] | UserChat;
  lastMessage: string;
  lastMessageTime: string;
}

export interface ChatMessage { 
  id: string;
  avatar: string;
  status: string;
  userName: string;
  message: string;
  time: string;
  isRead: boolean;
}

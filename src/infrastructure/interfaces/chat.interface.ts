
export interface ChatResponse {
  id: string;
  type: "individual" | "group";
  name: string;
  participants: number[] | number;
  lastMessage: string;
  lastMessageTime: string;
  isMuted: boolean;
  unreadCount: number;
}

export interface ChatMessageResponse {
  id: string;
  chatId: number;
  fromUserId: number;
  toUserId: number;
  content: string;
  timestamp: string;
  isRead: boolean;
}


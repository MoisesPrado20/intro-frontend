import { DateAdapter } from "../../config/adapters";
import { apiChatFetcher } from "../../config/api";

import { Chat, ChatMessage, User } from "../../domain/entities";
import { getUserByIdUseCase } from "../../domain/use-cases/auth";

import { ChatMessageResponse, ChatResponse } from "../interfaces";

export class ChatMapper {
  static async fromChatResponseToEntity(response: ChatResponse): Promise<Chat> {
    const participants = Array.isArray(response.participants)
      ? await Promise.all(
          response.participants.map((participantId) =>
            getUserByIdUseCase(apiChatFetcher, participantId)
          )
        )
      : await getUserByIdUseCase(apiChatFetcher, response.participants);

    return {
      id: response.id,
      type: response.type,
      name: response.name,
      lastMessage: response.lastMessage,
      lastMessageTime: DateAdapter.formatDateTime(response.lastMessageTime),
      participants: participants,
    };
  }

  static async fromChatMessageResponseToEntity(
    response: ChatMessageResponse
  ): Promise<ChatMessage> {
    const userMessage = await getUserByIdUseCase(apiChatFetcher, response.fromUserId,true) as User;

    return {
      id: response.id,
      avatar: userMessage.avatar,
      status: userMessage.status,
      userName: `${userMessage.firstName} ${userMessage.lastName}`,
      message: response.content,
      time: response.timestamp,
      isRead: response.isRead,
    };
  }
}

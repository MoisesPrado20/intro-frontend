import { HttpAdapter } from "../../../config/adapters/http";

import { ChatResponse } from "../../../infrastructure/interfaces";
import { ChatMapper } from "../../../infrastructure/mappers";
import { Chat } from "../../entities";

export const getChatByIdUseCase = async (
  fetcher: HttpAdapter,
  chatId: number,
): Promise<Chat> => {
  try {
    const chatById = await fetcher.get<ChatResponse>(`/chats/${chatId}`);

    return ChatMapper.fromChatResponseToEntity(chatById);
  } catch (error) {
    throw new Error(`Cannot get chat by id: ${error}`);
  }
};

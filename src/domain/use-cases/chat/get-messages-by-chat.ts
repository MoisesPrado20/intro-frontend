import { HttpAdapter } from "../../../config/adapters/http";
import { ChatMessageResponse } from "../../../infrastructure/interfaces";
import { ChatMapper } from "../../../infrastructure/mappers";
import { ChatMessage } from "../../entities";

export const getMessagesByChatUseCase = async (
  fetcher: HttpAdapter,
  chatId: number
): Promise<ChatMessage[]> => {
  try {
    const messagesByChat = await fetcher.get<ChatMessageResponse[]>(
      `/messages`,
      {
        params: {
          chatId,
        },
      }
    );

    const messages = messagesByChat.map(
      ChatMapper.fromChatMessageResponseToEntity
    );

    return await Promise.all(messages);
  } catch (error) {
    throw new Error(`Cannot get chat messages: ${error}`);
  }
};

import { HttpAdapter } from "../../../config/adapters/http";

import { ChatResponse } from "../../../infrastructure/interfaces";
import { ChatMapper } from "../../../infrastructure/mappers";
import { Chat } from "../../entities";
import { Formatter } from "../../../config/helpers";

export const getChatsUseCase = async (
  fetcher: HttpAdapter,
  searchQuery: string = "",
  searchFields: (keyof Chat)[] = ["name"]
): Promise<Chat[]> => {
  try {
    const chats = await fetcher.get<ChatResponse[]>(`/chats`);

    const allChats = await Promise.all(
      chats.map(ChatMapper.fromChatResponseToEntity)
    );

    if (!searchQuery.trim()) return allChats;


    const normalizedQuery = Formatter.normalizeText(searchQuery);

    const filteredChats = allChats.filter((chat) =>
      searchFields.some((field) =>
        Formatter.normalizeText(String(chat[field])).includes(normalizedQuery)
      )
    );


    return filteredChats;
  } catch (error) {
    throw new Error(`Cannot get chats: ${error}`);
  }
};

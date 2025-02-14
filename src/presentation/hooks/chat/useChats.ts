import { useEffect, useState } from "../core";

import { apiChatFetcher } from "../../../config/api";
import { getChatsUseCase } from "../../../domain/use-cases/chat";
import { Chat } from "../../../domain/entities";

export const useChats = (searchQuery: string = "", searchFields: (keyof Chat)[] = ["name"]) => {
  const [chats, setChats, subscribeChats] = useState<Chat[]>([]);
  const [isLoadingChats, setIsLoadingChats, subscribeLoading] =
    useState<boolean>(false);

  const getChats = async () => {
    setIsLoadingChats(true);
    const chats = await getChatsUseCase(apiChatFetcher, searchQuery,searchFields);
    setChats(chats);
    setIsLoadingChats(false);
  };

  useEffect(() => {
    getChats();
  }, []);

  return {
    chats,
    subscribeChats,
    isLoadingChats,
    subscribeLoading,
  };
};

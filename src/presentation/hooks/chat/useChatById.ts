import { useEffect, useState } from "../core";

import { apiChatFetcher } from "../../../config/api";
import { getChatByIdUseCase } from "../../../domain/use-cases/chat";
import { Chat } from "../../../domain/entities";

export const useChatById = (chatId: number) => {
  const [chat, setChat, subscribeChat] = useState<Chat>({} as Chat);
  const [isLoadingChat, setIsLoadingChat, subscribeLoading] =
    useState<boolean>(false);

  const getChat = async () => {
    setIsLoadingChat(true);
    const chat = await getChatByIdUseCase(apiChatFetcher, chatId);
    setChat(chat);
    setIsLoadingChat(false);
  };

  useEffect(() => {
    getChat();
  }, []);

  return {
    chat,
    subscribeChat,
    isLoadingChat,
    subscribeLoading,
  };
};

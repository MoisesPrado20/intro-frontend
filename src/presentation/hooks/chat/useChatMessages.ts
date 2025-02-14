import { useEffect, useState } from "../core";

import { apiChatFetcher } from "../../../config/api";
import { getMessagesByChatUseCase } from "../../../domain/use-cases/chat";
import { ChatMessage } from "../../../domain/entities";

export const useChatMessages = (chatId: number) => {
  const [chatMessages, setChatMessages, subscribeChatMessages] = useState<ChatMessage[]>([]);
  const [isLoadingChatMessages, setIsLoadingChatMessages, subscribeLoading] =
    useState<boolean>(false);

  const getChatsMessages = async () => {
    setIsLoadingChatMessages(true);
    const chatMessages = await getMessagesByChatUseCase(apiChatFetcher, chatId);
    setChatMessages(chatMessages);
    setIsLoadingChatMessages(false);
  };

  useEffect(() => {
    getChatsMessages();
  }, []);

  return {
    chatMessages,
    subscribeChatMessages,
    isLoadingChatMessages,
    subscribeLoading,
  };
};

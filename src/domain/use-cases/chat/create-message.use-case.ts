import { HttpAdapter } from "../../../config/adapters/http";

interface CreateMessageBody {
  chatId: number;
  fromUserId: number;
  toUserId?: number;
  content: string;
}

export const createMessageUseCase = async (
  fetcher: HttpAdapter,
  body: CreateMessageBody
): Promise<void> => {
  try {
    const newMessage = await fetcher.post("/messages", {
      ...body,
      isRead: false,
      timestamp: new Date().toISOString(),
    });
    console.log(newMessage);

  } catch (error) {
    throw new Error(`Cannot create message: ${error}`);
  }
};

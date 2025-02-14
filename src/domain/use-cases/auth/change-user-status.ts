import { HttpAdapter } from "../../../config/adapters/http";
import { getFullUserUseCase } from "./get-full-user.use-case";


export const changeUserStatusUseCase = async (
  fetcher: HttpAdapter,
  userId: number,
  statusId: number,
): Promise<void> => {
  try {
    const fullCurrentUser = await getFullUserUseCase(fetcher, userId);
    await fetcher.put(`/users/${fullCurrentUser.id}`, {
      ...fullCurrentUser,
      statusId,
    });
  } catch (error) {
    throw new Error(`Cannot change user status: ${error}`);
  }
};

import { HttpAdapter } from "../../../config/adapters/http";
import { UserResponse } from "../../../infrastructure/interfaces";

export const getFullUserUseCase = async (
  fetcher: HttpAdapter,
  userId: number
): Promise<UserResponse> => {
  try {
    const user = await fetcher.get<UserResponse>(`/users/${userId}`);
    return user;
  } catch (error) {
    throw new Error(`Cannot get full user: ${error}`);
  }
};

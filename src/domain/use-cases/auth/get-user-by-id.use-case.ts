import { HttpAdapter } from "../../../config/adapters/http";

import { UserResponse } from "../../../infrastructure/interfaces";
import { UserMapper } from "../../../infrastructure/mappers";
import { User, UserChat } from "../../entities";

export const getUserByIdUseCase = async (
  fetcher: HttpAdapter,
  id: number,
  returnFullUserData: boolean = false,
): Promise<UserChat | User> => {
  try {
    const user = await fetcher.get<UserResponse>(`/users/${id}`);

    return returnFullUserData
      ? UserMapper.fromUserResponseToEntity(user)
      : UserMapper.fromUserChatResponseToEntity(user);
  } catch (error) {
    throw new Error(`Cannot get user by id: ${error}`);
  }
};

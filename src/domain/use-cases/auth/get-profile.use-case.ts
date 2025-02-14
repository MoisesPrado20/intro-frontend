import { HttpAdapter } from "../../../config/adapters/http";

import { AuthResponse, UserResponse } from "../../../infrastructure/interfaces";
import { UserMapper } from "../../../infrastructure/mappers";
import { User } from "../../entities";

export const getProfileUseCase = async (
  fetcher: HttpAdapter,
): Promise<User> => {
  try {
    const userAuth = await fetcher.get<AuthResponse>(`/authenticatedUser`);
    const userProfile = await fetcher.get<UserResponse>(`/users/${userAuth.userId}`);
    return UserMapper.fromUserResponseToEntity(userProfile);
  } catch (error) {
    throw new Error(`Cannot get user profile: ${error}`);
  }
};

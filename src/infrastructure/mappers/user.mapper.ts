import { apiChatFetcher } from "../../config/api";

import { User, UserChat } from "../../domain/entities";
import { UserResponse, UserStatusResponse } from "../interfaces";

export class UserMapper {
  static async fromUserResponseToEntity(response: UserResponse): Promise<User> {
    const userChat = await UserMapper.fromUserChatResponseToEntity(response);

    return {
      ...userChat,
      firstName: response.firstName,
      lastName: response.lastName,
      statusId: response.statusId,
    };
  }

  static async fromUserChatResponseToEntity(
    response: UserResponse
  ): Promise<UserChat> {
    const userStatus = await apiChatFetcher.get<UserStatusResponse>(
      `/statuses/${response.statusId}`
    );

    return {
      id: response.id,
      avatar: response.avatar,
      status: userStatus.name,
    };
  }
}

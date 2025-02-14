import { HttpAdapter } from "../../../config/adapters/http";

import { UserStatusResponse } from "../../../infrastructure/interfaces";
import { UserStatus } from "../../entities";

export const getUserStatusesUseCase = async (
  fetcher: HttpAdapter
): Promise<UserStatus[]> => {
  try {
    const userStatuses = await fetcher.get<UserStatusResponse[]>(`/statuses`);

    return userStatuses;
  } catch (error) {
    throw new Error(`Cannot get user statuses: ${error}`);
  }
};

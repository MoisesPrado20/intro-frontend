import { useState } from "../core";

import { apiChatFetcher } from "../../../config/api";
import { changeUserStatusUseCase } from "../../../domain/use-cases/auth";

export const useChangeStatus = () => {
  const [isLoadingChangeStatus, setIsLoadingChangeStatus, subscribeLoading] =
    useState<boolean>(false);

  const changeUserStatus = async (userId: number, statusId: number) => {
    setIsLoadingChangeStatus(true);
    await changeUserStatusUseCase(apiChatFetcher, userId, statusId);
    setIsLoadingChangeStatus(false);
  };

  return {
    changeUserStatus,
    isLoadingChangeStatus,
    subscribeLoading,
  };
};

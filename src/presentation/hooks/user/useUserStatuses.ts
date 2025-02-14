import { useEffect, useState } from "../core";

import { apiChatFetcher } from "../../../config/api";
import { getUserStatusesUseCase } from "../../../domain/use-cases/auth";
import { UserStatus } from "../../../domain/entities";

export const useUserStatuses = () => {
  const [userStatuses, setUserStatuses, subscribeUserStatuses] = useState<UserStatus[]>([]);
  const [isLoadingUserStatuses, setIsLoadingUserStatuses, subscribeLoading] =
    useState<boolean>(false);

  const getUserStatuses = async () => {
    setIsLoadingUserStatuses(true);

    const userStatuses = await getUserStatusesUseCase(apiChatFetcher);
    setUserStatuses(userStatuses);

    setIsLoadingUserStatuses(false);
  };

  useEffect(() => {
    getUserStatuses();
  }, []);

  return {
    userStatuses,
    subscribeUserStatuses,
    isLoadingUserStatuses,
    subscribeLoading,
  };
};

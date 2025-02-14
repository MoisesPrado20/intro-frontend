import { useEffect, useState } from "../core";

import { apiChatFetcher } from "../../../config/api";
import { getProfileUseCase } from "../../../domain/use-cases/auth";
import { User } from "../../../domain/entities";

export const useProfile = () => {
  const [profile, setProfile, subscribeProfile] = useState<User>({} as User);
  const [isLoadingProfile, setIsLoadingProfile, subscribeLoading] =
    useState<boolean>(false);

  const getProfile = async () => {
    setIsLoadingProfile(true);
    const profile = await getProfileUseCase(apiChatFetcher);
    setProfile(profile);
    setIsLoadingProfile(false);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return {
    profile,
    subscribeProfile,
    isLoadingProfile,
    subscribeLoading,
  };
};

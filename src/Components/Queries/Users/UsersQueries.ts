import { useTokenAuthQuery } from '@tricordarr/components/Queries/TokenAuthQuery';
import { ProfilePublicData, UserHeader } from '@tricordarr/libraries/Structs/ControllerStructs';

export const useUsersProfileQuery = (userID: string, options = {}) => {
  return useTokenAuthQuery<ProfilePublicData>(`/users/${userID}/profile`, options);
};

interface UserMatchQueryProps {
  searchQuery: string;
  favorers?: boolean;
  options?: {};
}

export const useUserMatchQuery = ({ searchQuery, favorers, options }: UserMatchQueryProps) => {
  return useTokenAuthQuery<UserHeader[]>(
    `/users/match/allnames/${searchQuery}`,
    {
      ...options,
      enabled: searchQuery.length >= 2,
    },
    {
      ...(favorers !== undefined && { favorers: favorers }),
    },
  );
};
export const useUserFindQuery = (username: string) => {
  return useTokenAuthQuery<UserHeader>(`/users/find/${username}`);
};

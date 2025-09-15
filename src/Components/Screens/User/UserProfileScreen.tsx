import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserProfileScreenBase } from '@tricordarr/components/Screens/User/UserProfileScreenBase';
import { useUserMutesQuery } from '@tricordarr/components/Queries/Users/UserMuteQueries';
import { useUserBlocksQuery } from '@tricordarr/components/Queries/Users/UserBlockQueries';
import { useUserFavoritesQuery } from '@tricordarr/components/Queries/Users/UserFavoriteQueries';
import { LoadingView } from '@tricordarr/components/Views/Static/LoadingView';
import { CommonStackComponents, CommonStackParamList } from '@tricordarr/components/Navigation/CommonScreens';
import { useUsersProfileQuery } from '@tricordarr/components/Queries/Users/UsersQueries';

type Props = NativeStackScreenProps<CommonStackParamList, CommonStackComponents.userProfileScreen>;

export const UserProfileScreen = ({ route }: Props) => {
  const { data, refetch, isLoading } = useUsersProfileQuery(route.params.userID);

  // Moved these out of the UserRelationsProvider so that they wouldn't get refetched on app startup.
  // isLoading means that there is no data in the cache. They'll auto refetch (enabled is implicitly true here)
  // in the background after staleTime or on app reload when we hit this screen.
  const { isLoading: isLoadingBlocks } = useUserBlocksQuery();
  const { isLoading: isLoadingMutes } = useUserMutesQuery();
  const { isLoading: isLoadingFavorites } = useUserFavoritesQuery();

  if (isLoadingBlocks || isLoadingFavorites || isLoadingMutes) {
    return <LoadingView />;
  }

  return (
    <UserProfileScreenBase
      data={data}
      refetch={refetch}
      isLoading={isLoading}
      enableContent={route.params.enableContent}
      oobe={route.params.oobe}
    />
  );
};

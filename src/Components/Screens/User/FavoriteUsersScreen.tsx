import React from 'react';
import { AppView } from '@tricordarr/components/Views/AppView';
import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import { UserSearchBar } from '@tricordarr/components/Search/UserSearchBar';
import { UserHeader } from '@tricordarr/libraries/Structs/ControllerStructs';
import { Text } from 'react-native-paper';
import { RefreshControl } from 'react-native';
import { UserListItem } from '@tricordarr/components/Lists/Items/UserListItem';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { UserFavoriteText } from '@tricordarr/components/Text/UserRelationsText';
import { useUserFavoritesQuery } from '@tricordarr/components/Queries/Users/UserFavoriteQueries';
import { ItalicText } from '@tricordarr/components/Text/ItalicText';
import { LoadingView } from '@tricordarr/components/Views/Static/LoadingView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonStackComponents, CommonStackParamList } from '@tricordarr/components/Navigation/CommonScreens';
import { useUserFavoriteMutation } from '@tricordarr/components/Queries/Users/UserFavoriteMutations';
import { useQueryClient } from '@tanstack/react-query';

type Props = NativeStackScreenProps<CommonStackParamList, CommonStackComponents.favoriteUsers>;
export const FavoriteUsersScreen = ({ navigation }: Props) => {
  const userFavoriteMutation = useUserFavoriteMutation();
  const { data, isFetching, refetch } = useUserFavoritesQuery();
  const queryClient = useQueryClient();

  const handleUnfavoriteUser = (userHeader: UserHeader) => {
    userFavoriteMutation.mutate(
      {
        action: 'unfavorite',
        userID: userHeader.userID,
      },
      {
        onSuccess: async () => {
          const invalidations = UserHeader.getRelationKeys().map(key => {
            return queryClient.invalidateQueries(key);
          });
          await Promise.all(invalidations);
        },
      },
    );
  };

  const handleFavoriteUser = (userHeader: UserHeader) => {
    userFavoriteMutation.mutate(
      {
        action: 'favorite',
        userID: userHeader.userID,
      },
      {
        onSuccess: async () => {
          const invalidations = UserHeader.getRelationKeys().map(key => {
            return queryClient.invalidateQueries(key);
          });
          await Promise.all(invalidations);
        },
      },
    );
  };

  if (data === undefined) {
    return <LoadingView />;
  }

  return (
    <AppView>
      <ScrollingContentView
        refreshControl={
          <RefreshControl refreshing={isFetching || userFavoriteMutation.isLoading} onRefresh={refetch} />
        }>
        <PaddedContentView>
          <UserFavoriteText />
        </PaddedContentView>
        <PaddedContentView>
          <UserSearchBar excludeHeaders={data} onPress={handleFavoriteUser} />
        </PaddedContentView>
        <PaddedContentView>
          <Text variant={'labelMedium'}>Favorite Users:</Text>
          {data.length === 0 && <ItalicText>You have not favorited any users.</ItalicText>}
          {data.map((relatedUserHeader, i) => (
            <UserListItem
              key={i}
              userHeader={relatedUserHeader}
              buttonIcon={AppIcons.unfavorite}
              onPress={() =>
                navigation.push(CommonStackComponents.userProfileScreen, {
                  userID: relatedUserHeader.userID,
                })
              }
              buttonOnPress={handleUnfavoriteUser}
            />
          ))}
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};

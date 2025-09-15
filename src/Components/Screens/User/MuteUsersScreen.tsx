import React from 'react';
import { AppView } from '@tricordarr/components/Views/AppView';
import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import { UserSearchBar } from '@tricordarr/components/Search/UserSearchBar';
import { UserHeader } from '@tricordarr/libraries/Structs/ControllerStructs';
import { Text } from 'react-native-paper';
import { RefreshControl } from 'react-native';
import { usePrivilege } from '@tricordarr/components/Context/Contexts/PrivilegeContext';
import { UserListItem } from '@tricordarr/components/Lists/Items/UserListItem';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { ModeratorMuteText, UserMuteText } from '@tricordarr/components/Text/UserRelationsText';
import { useUserMutesQuery } from '@tricordarr/components/Queries/Users/UserMuteQueries';
import { ItalicText } from '@tricordarr/components/Text/ItalicText';
import { LoadingView } from '@tricordarr/components/Views/Static/LoadingView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonStackComponents, CommonStackParamList } from '@tricordarr/components/Navigation/CommonScreens';
import { useUserMuteMutation } from '@tricordarr/components/Queries/Users/UserMuteMutations';
import { useQueryClient } from '@tanstack/react-query';

type Props = NativeStackScreenProps<CommonStackParamList, CommonStackComponents.muteUsers>;
export const MuteUsersScreen = ({ navigation }: Props) => {
  const { hasModerator } = usePrivilege();
  const userMuteMutation = useUserMuteMutation();
  const { data, isFetching, refetch } = useUserMutesQuery();
  const queryClient = useQueryClient();

  const handleUnmuteUser = (userHeader: UserHeader) => {
    userMuteMutation.mutate(
      {
        action: 'unmute',
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

  const handleMuteUser = (userHeader: UserHeader) => {
    userMuteMutation.mutate(
      {
        action: 'mute',
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
        refreshControl={<RefreshControl refreshing={isFetching || userMuteMutation.isLoading} onRefresh={refetch} />}>
        <PaddedContentView>
          <UserMuteText />
          {hasModerator && <ModeratorMuteText />}
        </PaddedContentView>
        <PaddedContentView>
          <UserSearchBar excludeHeaders={data} onPress={handleMuteUser} />
        </PaddedContentView>
        <PaddedContentView>
          <Text variant={'labelMedium'}>Muted Users:</Text>
          {data.length === 0 && <ItalicText>You have not muted any users.</ItalicText>}
          {data.map((relatedUserHeader, i) => (
            <UserListItem
              key={i}
              userHeader={relatedUserHeader}
              buttonIcon={AppIcons.unmute}
              onPress={() =>
                navigation.push(CommonStackComponents.userProfileScreen, {
                  userID: relatedUserHeader.userID,
                })
              }
              buttonOnPress={handleUnmuteUser}
            />
          ))}
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};

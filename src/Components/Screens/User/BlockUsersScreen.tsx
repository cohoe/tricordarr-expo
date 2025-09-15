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
import { useUserBlocksQuery } from '@tricordarr/components/Queries/Users/UserBlockQueries';
import { ModeratorBlockText, UserBlockText } from '@tricordarr/components/Text/UserRelationsText';
import { ItalicText } from '@tricordarr/components/Text/ItalicText';
import { LoadingView } from '@tricordarr/components/Views/Static/LoadingView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonStackComponents, CommonStackParamList } from '@tricordarr/components/Navigation/CommonScreens';
import { useUserBlockMutation } from '@tricordarr/components/Queries/Users/UserBlockMutations';
import { useQueryClient } from '@tanstack/react-query';

type Props = NativeStackScreenProps<CommonStackParamList, CommonStackComponents.blockUsers>;
export const BlockUsersScreen = ({ navigation }: Props) => {
  const { hasModerator } = usePrivilege();
  const userBlockMutation = useUserBlockMutation();
  const { data, isFetching, refetch } = useUserBlocksQuery();
  const queryClient = useQueryClient();

  const handleUnblockUser = (userHeader: UserHeader) => {
    userBlockMutation.mutate(
      {
        action: 'unblock',
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

  const handleBlockUser = (userHeader: UserHeader) => {
    userBlockMutation.mutate(
      {
        action: 'block',
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
        refreshControl={<RefreshControl refreshing={isFetching || userBlockMutation.isLoading} onRefresh={refetch} />}>
        <PaddedContentView>
          <UserBlockText />
          {hasModerator && <ModeratorBlockText />}
        </PaddedContentView>
        <PaddedContentView>
          <UserSearchBar excludeHeaders={data} onPress={handleBlockUser} />
        </PaddedContentView>
        <PaddedContentView>
          <Text variant={'labelMedium'}>Blocked Users:</Text>
          {data.length === 0 && <ItalicText>You have not blocked any users.</ItalicText>}
          {data.map((relatedUserHeader, i) => (
            <UserListItem
              key={i}
              userHeader={relatedUserHeader}
              buttonIcon={AppIcons.unblock}
              onPress={() =>
                navigation.push(CommonStackComponents.userProfileScreen, {
                  userID: relatedUserHeader.userID,
                })
              }
              buttonOnPress={handleUnblockUser}
            />
          ))}
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};

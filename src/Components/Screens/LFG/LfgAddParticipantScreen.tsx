import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppView } from '@tricordarr/components/Views/AppView';
import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import { UserHeader } from '@tricordarr/libraries/Structs/ControllerStructs';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import { UserSearchBar } from '@tricordarr/components/Search/UserSearchBar';
import { useFezParticipantMutation } from '@tricordarr/components/Queries/Fez/Management/FezManagementUserMutations';
import { LoadingView } from '@tricordarr/components/Views/Static/LoadingView';
import { RefreshControl } from 'react-native';
import { CommonStackComponents, CommonStackParamList } from '@tricordarr/components/Navigation/CommonScreens';
import { useFezQuery } from '@tricordarr/components/Queries/Fez/FezQueries';
import { useQueryClient } from '@tanstack/react-query';

type Props = NativeStackScreenProps<CommonStackParamList, CommonStackComponents.lfgAddParticipantScreen>;

export const LfgAddParticipantScreen = ({ route, navigation }: Props) => {
  const participantMutation = useFezParticipantMutation();
  const { data } = useFezQuery({
    fezID: route.params.fezID,
  });
  const lfg = data?.pages[0];
  const queryClient = useQueryClient();

  const onPress = (user: UserHeader) => {
    participantMutation.mutate(
      {
        action: 'add',
        fezID: route.params.fezID,
        userID: user.userID,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries([`/fez/${route.params.fezID}`]);
          navigation.goBack();
        },
      },
    );
  };

  if (!lfg || !lfg.members) {
    return <LoadingView />;
  }

  return (
    <AppView>
      <ScrollingContentView refreshControl={<RefreshControl refreshing={participantMutation.isLoading} />}>
        <PaddedContentView>
          <UserSearchBar excludeHeaders={lfg.members.participants || []} onPress={onPress} />
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};

import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppView} from '@tricordarr/../Views/AppView';
import {ScrollingContentView} from '@tricordarr/../Views/Content/ScrollingContentView';
import {UserHeader} from '@tricordarr/../../Libraries/Structs/ControllerStructs';
import {PaddedContentView} from '@tricordarr/../Views/Content/PaddedContentView';
import {UserSearchBar} from '@tricordarr/../Search/UserSearchBar';
import {useFezParticipantMutation} from '@tricordarr/../Queries/Fez/Management/FezManagementUserMutations.ts';
import {LoadingView} from '@tricordarr/../Views/Static/LoadingView';
import {RefreshControl} from 'react-native';
import {CommonStackComponents, CommonStackParamList} from '@tricordarr/../Navigation/CommonScreens';
import {useFezQuery} from '@tricordarr/../Queries/Fez/FezQueries.ts';
import {useQueryClient} from '@tanstack/react-query';

type Props = NativeStackScreenProps<CommonStackParamList, CommonStackComponents.lfgAddParticipantScreen>;

export const LfgAddParticipantScreen = ({route, navigation}: Props) => {
  const participantMutation = useFezParticipantMutation();
  const {data} = useFezQuery({
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

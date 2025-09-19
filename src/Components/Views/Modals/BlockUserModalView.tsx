import React from 'react';
import {View} from 'react-native';
import {UserHeader} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {ModalCard} from '@tricordarr/Components/Cards/ModalCard';
import {useModal} from '@tricordarr/Components/Context/Contexts/ModalContext';
import {PrimaryActionButton} from '@tricordarr/Components/Buttons/PrimaryActionButton';
import {useAppTheme} from '@tricordarr/Styles/Theme';
import {usePrivilege} from '@tricordarr/Components/Context/Contexts/PrivilegeContext';
import {ModeratorBlockText, UserBlockText} from '@tricordarr/Components/Text/UserRelationsText';
import {useUserBlockMutation} from '@tricordarr/Queries/Users/UserBlockMutations.ts';
import {useQueryClient} from '@tanstack/react-query';

interface BlockUserModalViewProps {
  user: UserHeader;
}

const BlockUserModalContent = () => {
  const {hasModerator} = usePrivilege();
  return (
    <>
      <UserBlockText />
      {hasModerator && <ModeratorBlockText />}
    </>
  );
};

export const BlockUserModalView = ({user}: BlockUserModalViewProps) => {
  const blockMutation = useUserBlockMutation();
  const {setModalVisible} = useModal();
  const theme = useAppTheme();
  const queryClient = useQueryClient();

  const onSubmit = () => {
    blockMutation.mutate(
      {
        userID: user.userID,
        action: 'block',
      },
      {
        onSuccess: () => {
          const invalidations = UserHeader.getRelationKeys().map(key => {
            return queryClient.invalidateQueries(key);
          });
          Promise.all(invalidations);
          setModalVisible(false);
        },
      },
    );
  };

  const cardActions = (
    <PrimaryActionButton
      buttonColor={theme.colors.twitarrNegativeButton}
      buttonText={'Block'}
      onPress={onSubmit}
      isLoading={blockMutation.isLoading}
      disabled={blockMutation.isLoading}
    />
  );

  return (
    <View>
      <ModalCard title={'Block'} closeButtonText={'Cancel'} content={<BlockUserModalContent />} actions={cardActions} />
    </View>
  );
};

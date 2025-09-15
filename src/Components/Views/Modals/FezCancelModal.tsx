import { useModal } from '@tricordarr/components/Context/Contexts/ModalContext';
import { useAppTheme } from '@tricordarr/styles/Theme';
import { PrimaryActionButton } from '@tricordarr/components/Buttons/PrimaryActionButton';
import { View } from 'react-native';
import { ModalCard } from '@tricordarr/components/Cards/ModalCard';
import React from 'react';
import { FezData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { Text } from 'react-native-paper';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';
import { useQueryClient } from '@tanstack/react-query';
import { useFezCancelMutation } from '@tricordarr/components/Queries/Fez/FezMutations';
import { useSnackbar } from '@tricordarr/components/Context/Contexts/SnackbarContext';
import { FezType } from '@tricordarr/libraries/Enums/FezType';

const ModalContent = ({ fez }: { fez: FezData; }) => {
  const { commonStyles } = useStyles();
  const noun = FezType.isLFGType(fez.fezType) ? 'LFG' : 'event';
  return (
    <>
      <Text style={[commonStyles.marginBottomSmall]}>
        Cancelling the {noun} will mark it as not happening and notify all participants. The {noun} won't be deleted;
        participants can still create and read posts.
      </Text>
      <Text style={[commonStyles.marginBottomSmall]}>
        If you haven't, you may want to make a post letting participants know why the event was cancelled.
      </Text>
    </>
  );
};

export const FezCancelModal = ({ fezData }: { fezData: FezData; }) => {
  const { setSnackbarPayload } = useSnackbar();
  const { setModalVisible } = useModal();
  const theme = useAppTheme();
  const cancelMutation = useFezCancelMutation();
  const queryClient = useQueryClient();

  const onSubmit = () => {
    cancelMutation.mutate(
      {
        fezID: fezData.fezID,
      },
      {
        onSuccess: async () => {
          setSnackbarPayload({ message: 'Successfully canceled this event.', messageType: 'info' });
          const invalidations = FezData.getCacheKeys(fezData.fezID).map(key => {
            return queryClient.invalidateQueries(key);
          });
          await Promise.all([...invalidations, queryClient.invalidateQueries(['/notification/global'])]);
          setModalVisible(false);
        },
      },
    );
  };

  const cardActions = (
    <PrimaryActionButton
      buttonColor={theme.colors.twitarrNegativeButton}
      buttonText={'Cancel'}
      onPress={onSubmit}
      isLoading={cancelMutation.isLoading}
      disabled={cancelMutation.isLoading}
    />
  );

  return (
    <View>
      <ModalCard
        title={'Cancel'}
        closeButtonText={'Close'}
        content={<ModalContent fez={fezData} />}
        actions={cardActions}
      />
    </View>
  );
};

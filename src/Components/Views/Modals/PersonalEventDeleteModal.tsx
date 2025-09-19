import {useModal} from '@tricordarr/Components/Context/Contexts/ModalContext';
import {useAppTheme} from '@tricordarr/Styles/Theme';
import {PrimaryActionButton} from '@tricordarr/Components/Buttons/PrimaryActionButton';
import {View} from 'react-native';
import {ModalCard} from '@tricordarr/Components/Cards/ModalCard';
import React from 'react';
import {FezData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {Text} from 'react-native-paper';
import {useStyles} from '@tricordarr/Components/Context/Contexts/StyleContext';
import {useQueryClient} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import {useFezDeleteMutation} from '@tricordarr/Queries/Fez/FezMutations.ts';
import {useSnackbar} from '@tricordarr/Components/Context/Contexts/SnackbarContext.ts';

const ModalContent = () => {
  const {commonStyles} = useStyles();
  return <Text style={[commonStyles.marginBottomSmall]}>You sure? There is no undo.</Text>;
};

interface PersonalEventDeleteModalProps {
  personalEvent: FezData;
  handleNavigation?: boolean;
}

export const PersonalEventDeleteModal = ({personalEvent, handleNavigation = true}: PersonalEventDeleteModalProps) => {
  const {setSnackbarPayload} = useSnackbar();
  const {setModalVisible} = useModal();
  const theme = useAppTheme();
  const deleteMutation = useFezDeleteMutation();
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const onSubmit = () => {
    deleteMutation.mutate(
      {
        fezID: personalEvent.fezID,
      },
      {
        onSuccess: async () => {
          if (handleNavigation) {
            navigation.goBack();
          }
          setModalVisible(false);
          setSnackbarPayload({message: 'Successfully deleted this event.', messageType: 'info'});
          const invalidations = FezData.getCacheKeys()
            .map(key => {
              return queryClient.invalidateQueries(key);
            })
            .concat([queryClient.invalidateQueries(['/notification/global'])]);
          await Promise.all(invalidations);
        },
      },
    );
  };

  const cardActions = (
    <PrimaryActionButton
      buttonColor={theme.colors.twitarrNegativeButton}
      buttonText={'Delete'}
      onPress={onSubmit}
      isLoading={deleteMutation.isLoading}
      disabled={deleteMutation.isLoading}
    />
  );

  return (
    <View>
      <ModalCard title={'Delete'} closeButtonText={'Close'} content={<ModalContent />} actions={cardActions} />
    </View>
  );
};

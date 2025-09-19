import React, {useState} from 'react';
import {Text} from 'react-native-paper';
import {PrimaryActionButton} from '@tricordarr/../../Buttons/PrimaryActionButton';
import {useAppTheme} from '@tricordarr/../../../styles/Theme';
import {ScrollingContentView} from '@tricordarr/../../Views/Content/ScrollingContentView';
import {PaddedContentView} from '@tricordarr/../../Views/Content/PaddedContentView';
import {AppView} from '@tricordarr/../../Views/AppView';
import {useErrorHandler} from '@tricordarr/../../Context/Contexts/ErrorHandlerContext';
import {useStyles} from '@tricordarr/../../Context/Contexts/StyleContext';
import {useModal} from '@tricordarr/../../Context/Contexts/ModalContext';
import {HelpModalView} from '@tricordarr/../../Views/Modals/HelpModalView';
import {RefreshControl} from 'react-native';
import {useSwiftarrQueryClient} from '@tricordarr/../../Context/Contexts/SwiftarrQueryClientContext';
import {useHealthQuery} from '@tricordarr/../../Queries/Client/ClientQueries.ts';
import {useOpenQuery} from '@tricordarr/../../Queries/OpenQuery.ts';
import {useSnackbar} from '@tricordarr/../../Context/Contexts/SnackbarContext.ts';
import {BaseFABGroup} from '@tricordarr/../../Buttons/FloatingActionButtons/BaseFABGroup.tsx';

export const TestErrorScreen = () => {
  const theme = useAppTheme();
  const {setErrorBanner, errorBanner} = useErrorHandler();
  const {snackbarPayload, setSnackbarPayload} = useSnackbar();
  const {commonStyles} = useStyles();
  const {setModalContent, setModalVisible, setModalOnDismiss} = useModal();
  const {refetch: refetchErrorQuery, isFetching: isFetchingError} = useOpenQuery('/nonexistant', {
    enabled: false,
  });
  const {errorCount} = useSwiftarrQueryClient();
  const {refetch: refetchSuccessQuery, isFetching: isFetchingSuccess} = useHealthQuery({
    enabled: false,
  });
  const [fault, setFault] = useState(false);

  const onDismiss = () => console.log('[TestErrorScreen.tsx] Modal dismissed.');
  const onModal = () => {
    setModalContent(<HelpModalView text={'This is a test'} />);
    setModalVisible(true);
    setModalOnDismiss(onDismiss);
  };

  const triggerCriticalFault = () => setFault(true);

  if (fault) {
    throw Error('Critical Fault');
  }

  return (
    <AppView>
      <ScrollingContentView
        refreshControl={<RefreshControl refreshing={isFetchingError || isFetchingSuccess} enabled={false} />}>
        <PaddedContentView>
          <Text>Banner: {errorBanner}</Text>
          <PrimaryActionButton
            buttonText="Banner"
            buttonColor={theme.colors.twitarrNegativeButton}
            onPress={() => setErrorBanner('This is a banner error.')}
            style={[commonStyles.marginTopSmall]}
          />
          <Text>Snackbar: {snackbarPayload?.message}</Text>
          <PrimaryActionButton
            buttonText="Snackbar"
            buttonColor={theme.colors.twitarrNegativeButton}
            onPress={() => setSnackbarPayload({message: 'This is a snackbar error.'})}
            style={[commonStyles.marginTopSmall]}
          />
          <Text>Modal</Text>
          <PrimaryActionButton
            buttonText={'Modal'}
            buttonColor={theme.colors.twitarrNegativeButton}
            onPress={onModal}
            style={[commonStyles.marginTopSmall]}
          />
        </PaddedContentView>
        <PaddedContentView>
          <Text>{errorCount}</Text>
          <PrimaryActionButton
            buttonText={'Fail Query'}
            onPress={refetchErrorQuery}
            buttonColor={theme.colors.twitarrNegativeButton}
          />
        </PaddedContentView>
        <PaddedContentView>
          <PrimaryActionButton buttonText={'Success Query'} onPress={refetchSuccessQuery} />
        </PaddedContentView>
        <PaddedContentView>
          <PrimaryActionButton
            buttonText={'Trigger Critical Fault'}
            buttonColor={theme.colors.twitarrNegativeButton}
            onPress={triggerCriticalFault}
          />
        </PaddedContentView>
      </ScrollingContentView>
      <BaseFABGroup actions={[]} />
    </AppView>
  );
};

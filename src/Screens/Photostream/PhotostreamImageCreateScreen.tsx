import React, {useCallback, useEffect, useState} from 'react';
import {AppView} from '@tricordarr/Components/Views/AppView';
import {usePhotostreamLocationDataQuery} from '@tricordarr/Queries/Photostream/PhotostreamQueries';
import {ScrollingContentView} from '@tricordarr/Components/Views/Content/ScrollingContentView';
import {RefreshControl, View} from 'react-native';
import {PhotostreamImageCreateForm} from '@tricordarr/Components/Forms/Photostream/PhotostreamImageCreateForm';
import {PhotostreamCreateFormValues} from '@tricordarr/Libraries/Types/FormValues';
import {FormikHelpers} from 'formik';
import {LoadingView} from '@tricordarr/Components/Views/Static/LoadingView';
import {PhotostreamUploadData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackComponents, MainStackParamList} from '@tricordarr/Components/Navigation/Stacks/MainStackNavigator';
import {useQueryClient} from '@tanstack/react-query';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView';
import {usePhotostreamImageUploadMutation} from '@tricordarr/Queries/Photostream/PhotostreamMutations';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {MaterialHeaderButton} from '@tricordarr/Components/Buttons/MaterialHeaderButton';
import {PhotostreamActionsMenu} from '@tricordarr/Components/Menus/Photostream/PhotostreamActionsMenu';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';

export type Props = NativeStackScreenProps<MainStackParamList, MainStackComponents.photostreamImageCreateScreen>;

export const PhotostreamImageCreateScreen = ({navigation}: Props) => {
  const {data: locationData, refetch: refetchLocationData} = usePhotostreamLocationDataQuery();
  const [refreshing, setRefreshing] = useState(false);
  const uploadMutation = usePhotostreamImageUploadMutation();
  const queryClient = useQueryClient();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchLocationData();
    setRefreshing(false);
  };

  const onSubmit = (values: PhotostreamCreateFormValues, helpers: FormikHelpers<PhotostreamCreateFormValues>) => {
    if (!values.image) {
      helpers.setSubmitting(false);
      return;
    }
    const payload: PhotostreamUploadData = {
      createdAt: new Date().toISOString(), // @TODO extract the date from the image
      ...(values.locationName ? {locationName: values.locationName} : undefined),
      ...(values.eventData ? {eventID: values.eventData.eventID} : undefined),
      image: values.image,
    };
    uploadMutation.mutate(
      {
        imageUploadData: payload,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['/photostream']);
          navigation.goBack();
        },
        onSettled: () => {
          helpers.setSubmitting(false);
        },
      },
    );
  };

  const getNavButtons = useCallback(() => {
    return (
      <View>
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Item
            title={'Help'}
            iconName={AppIcons.help}
            onPress={() => navigation.push(MainStackComponents.photostreamHelpScreen)}
          />
        </HeaderButtons>
      </View>
    );
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: getNavButtons,
    });
  }, [getNavButtons, navigation]);

  if (!locationData) {
    return <LoadingView />;
  }

  return (
    <AppView>
      <ScrollingContentView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <PaddedContentView>
          <PhotostreamImageCreateForm
            locations={locationData.locations}
            events={locationData.events}
            onSubmit={onSubmit}
          />
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};

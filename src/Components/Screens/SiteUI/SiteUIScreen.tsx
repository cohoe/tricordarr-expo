import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonStackComponents, CommonStackParamList } from '@tricordarr/components/Navigation/CommonScreens';
import { SiteUIScreenBase } from '@tricordarr/components/Screens/SiteUI/SiteUIScreenBase';
import { useSwiftarrQueryClient } from '@tricordarr/components/Context/Contexts/SwiftarrQueryClientContext';

type Props = NativeStackScreenProps<CommonStackParamList, CommonStackComponents.siteUIScreen>;

export const SiteUIScreen = ({ route }: Props) => {
  const { serverUrl } = useSwiftarrQueryClient();

  const getInitialUrl = () => {
    let newUrl = serverUrl;

    if (route.params.moderate) {
      newUrl += '/moderate';
    } else if (route.params.admin) {
      newUrl += '/admin';
    }

    if (route?.params?.resource) {
      newUrl += `/${route.params.resource}`;

      if (route.params.id) {
        newUrl += `/${route.params.id}`;
      }
    }
    return newUrl;
  };

  return <SiteUIScreenBase initialUrl={getInitialUrl()} initialKey={route.params.timestamp} />;
};

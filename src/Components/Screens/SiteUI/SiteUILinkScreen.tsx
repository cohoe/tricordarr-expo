import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonStackParamList } from '@tricordarr/components/Navigation/CommonScreens';
import { SiteUIScreenBase } from '@tricordarr/components/Screens/SiteUI/SiteUIScreenBase';
import { useSwiftarrQueryClient } from '@tricordarr/components/Context/Contexts/SwiftarrQueryClientContext';

type Props = NativeStackScreenProps<CommonStackParamList>;

export const SiteUILinkScreen = ({ route }: Props) => {
  const { serverUrl } = useSwiftarrQueryClient();
  return <SiteUIScreenBase initialUrl={`${serverUrl}/${route.path}`} />;
};

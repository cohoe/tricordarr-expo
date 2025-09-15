import React from 'react';
import {EventCardMarkerView} from '@tricordarr/components/Views/Schedule/EventCardMarkerView';
import {useAppTheme} from '@tricordarr/styles/Theme';

export const EventCardNowView = () => {
  const theme = useAppTheme();
  return (
    <EventCardMarkerView
      backgroundColor={theme.colors.twitarrPositiveButton}
      color={theme.colors.onTwitarrPositiveButton}
      label={'Now'}
    />
  );
};

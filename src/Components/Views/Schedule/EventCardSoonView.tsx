import React from 'react';
import {EventCardMarkerView} from '@tricordarr/components/Views/Schedule/EventCardMarkerView';
import {useAppTheme} from '@tricordarr/styles/Theme';

export const EventCardSoonView = () => {
  const theme = useAppTheme();
  return (
    <EventCardMarkerView
      backgroundColor={theme.colors.twitarrYellow}
      color={theme.colors.onTwitarrYellow}
      label={'Soon'}
    />
  );
};

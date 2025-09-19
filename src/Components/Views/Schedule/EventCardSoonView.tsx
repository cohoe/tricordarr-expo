import React from 'react';
import {EventCardMarkerView} from '@tricordarr/Components/Views/Schedule/EventCardMarkerView';
import {useAppTheme} from '@tricordarr/Styles/Theme';

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

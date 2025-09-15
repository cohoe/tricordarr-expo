import React from 'react';
import {LfgListScreen} from '@tricordarr/components/Screens/LFG/LfgListScreen';

export const LfgFormerScreen = () => {
  return <LfgListScreen endpoint={'former'} enableFilters={false} enableReportOnly={true} showFab={false} />;
};

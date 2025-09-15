import { Item } from 'react-navigation-header-buttons';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import React from 'react';
import { ProfilePublicData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { CommonStackComponents, useCommonStack } from '@tricordarr/components/Navigation/CommonScreens';

interface HeaderProfileSeamailButtonProps {
  profile: ProfilePublicData;
}

export const HeaderProfileSeamailButton = (props: HeaderProfileSeamailButtonProps) => {
  const commonNavigation = useCommonStack();
  const seamailCreateHandler = () => {
    commonNavigation.push(CommonStackComponents.seamailCreateScreen, {
      initialUserHeader: props.profile.header,
    });
  };
  return <Item title={'Create Seamail'} iconName={AppIcons.seamailCreate} onPress={seamailCreateHandler} />;
};

import React, {PropsWithChildren, useCallback} from 'react';
import {DrawerContext} from '@tricordarr/components/Context/Contexts/DrawerContext';
import {AppDrawer} from '@tricordarr/components/Drawers/AppDrawer';
import {View} from 'react-native';
import {commonStyles} from '@tricordarr/styles';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {MaterialHeaderButton} from '@tricordarr/components/Buttons/MaterialHeaderButton';
import {AppIcons} from '@tricordarr/libraries/Enums/Icons';

export const DrawerProvider = ({children}: PropsWithChildren) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const getLeftMainHeaderButtons = useCallback(() => {
    return (
      <View style={[commonStyles.marginRightBig]}>
        <HeaderButtons left HeaderButtonComponent={MaterialHeaderButton}>
          <Item title="Drawer" iconName={AppIcons.drawer} onPress={() => setDrawerOpen(prevOpen => !prevOpen)} />
        </HeaderButtons>
      </View>
    );
  }, [setDrawerOpen]);

  return (
    <DrawerContext.Provider value={{drawerOpen, setDrawerOpen, getLeftMainHeaderButtons}}>
      <AppDrawer>{children}</AppDrawer>
    </DrawerContext.Provider>
  );
};

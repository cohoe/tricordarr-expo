import React, { useState } from 'react';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { useCruise } from '@tricordarr/components/Context/Contexts/CruiseContext';
import { format } from 'date-fns';
import { useFilter } from '@tricordarr/components/Context/Contexts/FilterContext';
import { SelectableMenuItem } from '@tricordarr/components/Menus/Items/SelectableMenuItem';
import { MenuAnchor } from '@tricordarr/components/Menus/MenuAnchor';
import { AppHeaderMenu } from '@tricordarr/components/Menus/AppHeaderMenu';

export const LfgCruiseDayFilterMenu = () => {
  const [visible, setVisible] = useState(false);
  const { cruiseDays, adjustedCruiseDayToday } = useCruise();
  const { lfgCruiseDayFilter, setLfgCruiseDayFilter } = useFilter();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleCruiseDaySelection = (newCruiseDay: number) => {
    if (newCruiseDay === lfgCruiseDayFilter) {
      setLfgCruiseDayFilter(undefined);
    } else {
      setLfgCruiseDayFilter(newCruiseDay);
    }
    closeMenu();
  };

  const clearFilters = () => {
    setLfgCruiseDayFilter(undefined);
  };

  const menuAnchor = (
    <MenuAnchor
      title={'Cruise Day'}
      active={lfgCruiseDayFilter !== undefined}
      iconName={AppIcons.cruiseDay}
      onPress={openMenu}
      onLongPress={clearFilters}
    />
  );

  return (
    <AppHeaderMenu visible={visible} onDismiss={closeMenu} anchor={menuAnchor}>
      {cruiseDays.map(day => {
        return (
          <SelectableMenuItem
            title={`${format(day.date, 'EEEE')}${adjustedCruiseDayToday === day.cruiseDay ? ' (Today)' : ''}`}
            onPress={() => handleCruiseDaySelection(day.cruiseDay)}
            key={day.cruiseDay}
            selected={lfgCruiseDayFilter === day.cruiseDay}
          />
        );
      })}
    </AppHeaderMenu>
  );
};

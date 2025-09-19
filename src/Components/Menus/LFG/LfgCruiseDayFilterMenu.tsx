import React, {useState} from 'react';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';
import {useCruise} from '@tricordarr/Components/Context/Contexts/CruiseContext';
import {format} from 'date-fns';
import {useFilter} from '@tricordarr/Components/Context/Contexts/FilterContext';
import {SelectableMenuItem} from '@tricordarr/Components/Menus/Items/SelectableMenuItem.tsx';
import {MenuAnchor} from '@tricordarr/Components/Menus/MenuAnchor.tsx';
import {AppHeaderMenu} from '@tricordarr/Components/Menus/AppHeaderMenu.tsx';

export const LfgCruiseDayFilterMenu = () => {
  const [visible, setVisible] = useState(false);
  const {cruiseDays, adjustedCruiseDayToday} = useCruise();
  const {lfgCruiseDayFilter, setLfgCruiseDayFilter} = useFilter();

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

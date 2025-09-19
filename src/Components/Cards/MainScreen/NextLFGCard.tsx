import React from 'react';
import {View} from 'react-native';
import {CommonStackComponents, useCommonStack} from '@tricordarr/Components/Navigation/CommonScreens';
import {useFezQuery} from '@tricordarr/Queries/Fez/FezQueries';
import {FezCard} from '@tricordarr/Components/Cards/Schedule/FezCard';
import {FezType} from '@tricordarr/Libraries/Enums/FezType';

export const NextLFGCard = ({lfgID}: {lfgID: string}) => {
  const {data} = useFezQuery({fezID: lfgID});
  const commonNavigation = useCommonStack();

  return (
    <View>
      {data && (
        <FezCard
          fez={data.pages[0]}
          showDay={true}
          onPress={() => {
            if (FezType.isLFGType(data.pages[0].fezType)) {
              commonNavigation.push(CommonStackComponents.lfgScreen, {fezID: lfgID});
            } else if (FezType.isPrivateEventType(data.pages[0].fezType)) {
              commonNavigation.push(CommonStackComponents.personalEventScreen, {eventID: lfgID});
            }
          }}
          titleHeader={'Your next appointment:'}
        />
      )}
    </View>
  );
};

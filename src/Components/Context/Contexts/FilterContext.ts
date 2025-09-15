import {createContext, Dispatch, SetStateAction, useContext} from 'react';
import {FezType} from '../../../libraries/Enums/FezType';
import {ForumFilter, ForumSortDirection, ForumSort} from '../../../libraries/Enums/ForumSortFilter';
import {ScheduleFilterSettings} from '../../../libraries/Types';

interface ScheduleFilterContextType {
  eventTypeFilter: string;
  setEventTypeFilter: Dispatch<SetStateAction<string>>;
  eventFavoriteFilter: boolean;
  setEventFavoriteFilter: Dispatch<SetStateAction<boolean>>;
  lfgCruiseDayFilter?: number;
  setLfgCruiseDayFilter: Dispatch<SetStateAction<number | undefined>>;
  lfgTypeFilter?: FezType;
  setLfgTypeFilter: Dispatch<SetStateAction<FezType | undefined>>;
  lfgHidePastFilter: boolean;
  setLfgHidePastFilter: Dispatch<SetStateAction<boolean>>;
  forumSortOrder?: ForumSort;
  setForumSortOrder: Dispatch<SetStateAction<ForumSort | undefined>>;
  forumFilter?: ForumFilter;
  setForumFilter: Dispatch<SetStateAction<ForumFilter | undefined>>;
  eventPersonalFilter: boolean;
  setEventPersonalFilter: Dispatch<SetStateAction<boolean>>;
  eventLfgFilter: boolean;
  setEventLfgFilter: Dispatch<SetStateAction<boolean>>;
  scheduleFilterSettings: ScheduleFilterSettings;
  forumSortDirection?: ForumSortDirection;
  setForumSortDirection: Dispatch<SetStateAction<ForumSortDirection | undefined>>;
}

export const FilterContext = createContext(<ScheduleFilterContextType>{});

export const useFilter = () => useContext(FilterContext);

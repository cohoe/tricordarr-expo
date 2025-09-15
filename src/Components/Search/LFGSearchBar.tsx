import React, { useRef, useState } from 'react';
import { RefreshControl } from 'react-native';
import { FezData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { TimeDivider } from '@tricordarr/components/Lists/Dividers/TimeDivider';
import { ScheduleFlatList } from '@tricordarr/components/Lists/Schedule/ScheduleFlatList';
import { FlashList } from '@shopify/flash-list';
import { useLfgListQuery } from '@tricordarr/components/Queries/Fez/FezQueries';
import { SearchBarBase } from '@tricordarr/components/Search/SearchBarBase';
import { FezListEndpoints } from '@tricordarr/libraries/Types';
import { useFilter } from '@tricordarr/components/Context/Contexts/FilterContext';

interface LFGSearchBarProps {
  endpoint: FezListEndpoints;
}

export const LFGSearchBar = ({ endpoint }: LFGSearchBarProps) => {
  const [queryEnable, setQueryEnable] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const { lfgHidePastFilter } = useFilter();
  const { data, refetch, isFetching, remove } = useLfgListQuery({
    search: searchQuery,
    hidePast: lfgHidePastFilter,
    options: {
      enabled: queryEnable,
    },
    endpoint: endpoint,
  });
  const listRef = useRef<FlashList<FezData>>(null);

  const onChangeSearch = (query: string) => {
    if (query !== searchQuery) {
      setQueryEnable(false);
      remove();
    }
    setSearchQuery(query);
  };
  const onClear = () => remove();

  const onSearch = () => {
    if (!searchQuery || searchQuery.length < 3) {
      setQueryEnable(false);
    } else {
      setQueryEnable(true);
    }
  };

  // Deal with some undefined issues below by defaulting to empty list.
  let lfgList: FezData[] = [];
  searchQuery && data?.pages.map(page => (lfgList = lfgList.concat(page.fezzes)));

  return (
    <>
      <SearchBarBase
        searchQuery={searchQuery}
        onSearch={onSearch}
        onChangeSearch={onChangeSearch}
        onClear={onClear}
        remove={remove}
      />
      <ScheduleFlatList
        listRef={listRef}
        listFooter={<TimeDivider label={'End of Results'} />}
        items={lfgList}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} enabled={!!searchQuery} />}
        separator={'day'}
      />
    </>
  );
};

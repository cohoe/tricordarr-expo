import React, { Dispatch, SetStateAction, useState } from 'react';
import { RefreshControl } from 'react-native';
import { SelectionButtons } from '@tricordarr/components/Buttons/SegmentedButtons/SelectionButtons';
import {
  CategoryData,
  ErrorResponse,
  ForumListData,
  ForumSearchData,
} from '@tricordarr/libraries/Structs/ControllerStructs';
import { ListTitleView } from '@tricordarr/components/Views/ListTitleView';
import { ForumThreadFlatList } from '@tricordarr/components/Lists/Forums/ForumThreadFlatList';
import { ForumCategoryFAB } from '@tricordarr/components/Buttons/FloatingActionButtons/ForumCategoryFAB';
import { useSelection } from '@tricordarr/components/Context/Contexts/SelectionContext';
import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface ForumThreadListViewProps {
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  enableFAB?: boolean;
  category?: CategoryData;
  setRefreshing: Dispatch<SetStateAction<boolean>>;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<CategoryData | ForumSearchData, AxiosError<ErrorResponse, any>>>;
  fetchPreviousPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<CategoryData | ForumSearchData, AxiosError<ErrorResponse, any>>>;
  isFetchingNextPage: boolean;
  isFetchingPreviousPage: boolean;
  title?: string;
  refreshing: boolean;
  onRefresh: () => void;
  forumListData: ForumListData[];
  subtitle?: string;
}

export const ForumThreadListView = ({
  hasNextPage,
  hasPreviousPage,
  enableFAB = false,
  category,
  setRefreshing,
  fetchNextPage,
  fetchPreviousPage,
  isFetchingNextPage,
  isFetchingPreviousPage,
  title,
  refreshing,
  onRefresh,
  forumListData,
  subtitle,
}: ForumThreadListViewProps) => {
  const { enableSelection } = useSelection();
  const [showFabLabel, setShowFabLabel] = useState(true);
  const onScrollThreshold = (hasScrolled: boolean) => setShowFabLabel(!hasScrolled);

  const handleLoadNext = () => {
    if (!isFetchingNextPage && hasNextPage) {
      setRefreshing(true);
      fetchNextPage().finally(() => setRefreshing(false));
    }
  };
  const handleLoadPrevious = () => {
    if (!isFetchingPreviousPage && hasPreviousPage) {
      setRefreshing(true);
      fetchPreviousPage().finally(() => setRefreshing(false));
    }
  };

  return (
    <>
      {enableSelection ? (
        <SelectionButtons items={forumListData} />
      ) : (
        <ListTitleView title={title} subtitle={subtitle} />
      )}
      <ForumThreadFlatList
        forumListData={forumListData}
        handleLoadNext={handleLoadNext}
        handleLoadPrevious={handleLoadPrevious}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        categoryID={category?.categoryID}
        onScrollThreshold={onScrollThreshold}
      />
      {enableFAB && category && <ForumCategoryFAB category={category} showLabel={showFabLabel} />}
    </>
  );
};

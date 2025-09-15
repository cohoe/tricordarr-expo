import { AppView } from '@tricordarr/components/Views/AppView';
import { FlatList, RefreshControl, View } from 'react-native';
import { ForumPostFlatList } from '@tricordarr/components/Lists/Forums/ForumPostFlatList';
import React, { useRef } from 'react';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PostData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { LoadingView } from '@tricordarr/components/Views/Static/LoadingView';
import { TimeDivider } from '@tricordarr/components/Lists/Dividers/TimeDivider';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import { CommonStackComponents, CommonStackParamList } from '@tricordarr/components/Navigation/CommonScreens';
import { useForumThreadPinnedPostsQuery, useForumThreadQuery } from '@tricordarr/components/Queries/Forum/ForumThreadQueries';

type Props = NativeStackScreenProps<CommonStackParamList, CommonStackComponents.forumPostPinnedScreen>;

export const ForumPostPinnedScreen = ({ route }: Props) => {
  const { data, refetch, isFetching } = useForumThreadPinnedPostsQuery(route.params.forumID);
  const { data: forumData } = useForumThreadQuery(route.params.forumID);
  const { commonStyles } = useStyles();
  const flatListRef = useRef<FlatList<PostData>>(null);

  if (data === undefined) {
    return <LoadingView />;
  }

  if (data.length === 0) {
    return (
      <AppView>
        <ScrollingContentView refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
          <PaddedContentView>
            <TimeDivider label={'No posts to display'} />
          </PaddedContentView>
        </ScrollingContentView>
      </AppView>
    );
  }

  const getListHeader = () => <PaddedContentView />;

  return (
    <AppView>
      <View style={[commonStyles.flex]}>
        <ForumPostFlatList
          flatListRef={flatListRef}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
          postList={data}
          enableShowInThread={true}
          forumData={forumData?.pages[0]}
          getListHeader={getListHeader}
        />
      </View>
    </AppView>
  );
};

import {AppView} from '@tricordarr/Components/Views/AppView';
import {FlatList, RefreshControl, View} from 'react-native';
import {ForumPostFlatList} from '@tricordarr/Components/Lists/Forums/ForumPostFlatList';
import React, {useRef} from 'react';
import {useStyles} from '@tricordarr/Components/Context/Contexts/StyleContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PostData} from '@tricordarr/Components/../Libraries/Structs/ControllerStructs';
import {LoadingView} from '@tricordarr/Components/Views/Static/LoadingView';
import {TimeDivider} from '@tricordarr/Components/Lists/Dividers/TimeDivider';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView';
import {ScrollingContentView} from '@tricordarr/Components/Views/Content/ScrollingContentView';
import {CommonStackComponents, CommonStackParamList} from '@tricordarr/Components/Navigation/CommonScreens';
import {useForumThreadPinnedPostsQuery, useForumThreadQuery} from '@tricordarr/Queries/Forum/ForumThreadQueries.ts';

type Props = NativeStackScreenProps<CommonStackParamList, CommonStackComponents.forumPostPinnedScreen>;

export const ForumPostPinnedScreen = ({route}: Props) => {
  const {data, refetch, isFetching} = useForumThreadPinnedPostsQuery(route.params.forumID);
  const {data: forumData} = useForumThreadQuery(route.params.forumID);
  const {commonStyles} = useStyles();
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

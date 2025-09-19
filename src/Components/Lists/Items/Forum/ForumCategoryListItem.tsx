import React from 'react';
import {Text} from 'react-native-paper';
import {CategoryData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {ForumStackComponents, useForumStackNavigation} from '@tricordarr/Components/Navigation/Stacks/ForumStackNavigator';
import {ForumCategoryListItemBase} from '@tricordarr/Components/Lists/Items/Forum/ForumCategoryListItemBase';

interface ForumCategoryListItemProps {
  category: CategoryData;
}

export const ForumCategoryListItem = ({category}: ForumCategoryListItemProps) => {
  const forumNavigation = useForumStackNavigation();

  const getThreadCount = () => <Text variant={'bodyMedium'}>{category.paginator.total} threads</Text>;
  const onPress = () => forumNavigation.push(ForumStackComponents.forumCategoryScreen, {category: category});

  return (
    <ForumCategoryListItemBase
      title={category.title}
      description={category.purpose}
      onPress={onPress}
      right={getThreadCount}
    />
  );
};

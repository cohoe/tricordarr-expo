import * as React from 'react';
import { ForumStackComponents, useForumStackNavigation } from '@tricordarr/components/Navigation/Stacks/ForumStackNavigator';
import { CategoryData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { BaseFAB } from '@tricordarr/components/Buttons/FloatingActionButtons/BaseFAB';

interface ForumFABProps {
  category: CategoryData;
  showLabel?: boolean;
}

export const ForumCategoryFAB = ({ category, showLabel }: ForumFABProps) => {
  const forumNavigation = useForumStackNavigation();
  return (
    <BaseFAB
      onPress={() =>
        forumNavigation.push(ForumStackComponents.forumThreadCreateScreen, {
          categoryId: category.categoryID,
        })
      }
      label={'New Forum'}
      showLabel={showLabel}
    />
  );
};

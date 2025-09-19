import * as React from 'react';
import {ForumStackComponents, useForumStackNavigation} from '@tricordarr/Components/Navigation/Stacks/ForumStackNavigator';
import {CategoryData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {BaseFAB} from '@tricordarr/Components/Buttons/FloatingActionButtons/BaseFAB';

interface ForumFABProps {
  category: CategoryData;
  showLabel?: boolean;
}

export const ForumCategoryFAB = ({category, showLabel}: ForumFABProps) => {
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

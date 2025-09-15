import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';
import { useDrawer } from '@tricordarr/components/Context/Contexts/DrawerContext';
import { useFeature } from '@tricordarr/components/Context/Contexts/FeatureContext';
import { SwiftarrFeature } from '@tricordarr/libraries/Enums/AppFeatures';
import { DisabledView } from '@tricordarr/components/Views/Static/DisabledView';
import { ForumCategoriesScreen } from '@tricordarr/components/Screens/Forum/ForumCategoriesScreen';
import { ForumCategoryScreen } from '@tricordarr/components/Screens/Forum/ForumCategoryScreen';
import { ForumPostMentionScreen } from '@tricordarr/components/Screens/Forum/Post/ForumPostMentionScreen';
import { ForumPostSelfScreen } from '@tricordarr/components/Screens/Forum/Post/ForumPostSelfScreen';
import { ForumPostFavoriteScreen } from '@tricordarr/components/Screens/Forum/Post/ForumPostFavoriteScreen';
import { ForumThreadFavoritesScreen } from '@tricordarr/components/Screens/Forum/Thread/ForumThreadFavoritesScreen';
import { ForumThreadMutesScreen } from '@tricordarr/components/Screens/Forum/Thread/ForumThreadMutesScreen';
import { ForumThreadOwnedScreen } from '@tricordarr/components/Screens/Forum/Thread/ForumThreadOwnedScreen';
import { ForumThreadRecentScreen } from '@tricordarr/components/Screens/Forum/Thread/ForumThreadRecentScreen';
import { ForumThreadSearchScreen } from '@tricordarr/components/Screens/Forum/Thread/ForumThreadSearchScreen';
import { ForumThreadCreateScreen } from '@tricordarr/components/Screens/Forum/Thread/ForumThreadCreateScreen';
import { ForumPostAlertwordScreen } from '@tricordarr/components/Screens/Forum/Post/ForumPostAlertwordScreen';
import { CommonScreens, CommonStackParamList } from '@tricordarr/components/Navigation/CommonScreens';
import { MainStack } from '@tricordarr/components/Navigation/Stacks/MainStackNavigator';
import { CategoryData } from '@tricordarr/libraries/Structs/ControllerStructs';

export type ForumStackParamList = CommonStackParamList & {
  ForumCategoriesScreen: undefined;
  ForumCategoryScreen: {
    category: CategoryData;
  };
  ForumPostMentionScreen: undefined;
  ForumPostSelfScreen: undefined;
  ForumPostFavoriteScreen: undefined;
  ForumFavoritesScreen: undefined;
  ForumMutesScreen: undefined;
  ForumOwnedScreen: undefined;
  ForumRecentScreen: undefined;
  ForumPostAlertwordScreen: {
    alertWord: string;
  };
  ForumThreadSearchScreen: {
    category?: CategoryData;
  };
  ForumThreadCreateScreen: {
    categoryId: string;
  };
};

export enum ForumStackComponents {
  forumCategoriesScreen = 'ForumCategoriesScreen',
  forumCategoryScreen = 'ForumCategoryScreen',
  forumPostMentionScreen = 'ForumPostMentionScreen',
  forumPostSelfScreen = 'ForumPostSelfScreen',
  forumPostFavoriteScreen = 'ForumPostFavoriteScreen',
  forumFavoritesScreen = 'ForumFavoritesScreen',
  forumMutesScreen = 'ForumMutesScreen',
  forumOwnedScreen = 'ForumOwnedScreen',
  forumRecentScreen = 'ForumRecentScreen',
  forumThreadSearchScreen = 'ForumThreadSearchScreen',
  forumThreadCreateScreen = 'ForumThreadCreateScreen',
  forumPostAlertwordScreen = 'ForumPostAlertwordScreen',
}

export const ForumStackNavigator = () => {
  const { screenOptions } = useStyles();
  const Stack = createNativeStackNavigator<ForumStackParamList>();
  const { getLeftMainHeaderButtons } = useDrawer();
  const { getIsDisabled } = useFeature();
  const isDisabled = getIsDisabled(SwiftarrFeature.forums);

  return (
    <Stack.Navigator
      initialRouteName={ForumStackComponents.forumCategoriesScreen}
      screenOptions={{ ...screenOptions, headerShown: true }}>
      <Stack.Screen
        name={ForumStackComponents.forumCategoriesScreen}
        component={isDisabled ? DisabledView : ForumCategoriesScreen}
        options={{
          headerLeft: getLeftMainHeaderButtons,
          title: 'Forum Categories',
        }}
      />
      <Stack.Screen
        name={ForumStackComponents.forumCategoryScreen}
        component={isDisabled ? DisabledView : ForumCategoryScreen}
        options={{
          title: 'Forums',
        }}
      />
      <Stack.Screen
        name={ForumStackComponents.forumPostMentionScreen}
        component={isDisabled ? DisabledView : ForumPostMentionScreen}
        options={{ title: 'Posts Mentioning You' }}
      />
      <Stack.Screen
        name={ForumStackComponents.forumPostSelfScreen}
        component={isDisabled ? DisabledView : ForumPostSelfScreen}
        options={{ title: 'Your Posts' }}
      />
      <Stack.Screen
        name={ForumStackComponents.forumPostFavoriteScreen}
        component={isDisabled ? DisabledView : ForumPostFavoriteScreen}
        options={{ title: 'Favorite Posts' }}
      />
      <Stack.Screen
        name={ForumStackComponents.forumFavoritesScreen}
        component={isDisabled ? DisabledView : ForumThreadFavoritesScreen}
        options={{ title: 'Favorite Forums' }}
      />
      <Stack.Screen
        name={ForumStackComponents.forumMutesScreen}
        component={isDisabled ? DisabledView : ForumThreadMutesScreen}
        options={{ title: 'Muted Forums' }}
      />
      <Stack.Screen
        name={ForumStackComponents.forumOwnedScreen}
        component={isDisabled ? DisabledView : ForumThreadOwnedScreen}
        options={{ title: 'Your Forums' }}
      />
      <Stack.Screen
        name={ForumStackComponents.forumRecentScreen}
        component={isDisabled ? DisabledView : ForumThreadRecentScreen}
        options={{ title: 'Recently Viewed' }}
      />
      <Stack.Screen
        name={ForumStackComponents.forumThreadSearchScreen}
        component={isDisabled ? DisabledView : ForumThreadSearchScreen}
        options={{ title: 'Forum Search' }}
      />
      <Stack.Screen
        name={ForumStackComponents.forumThreadCreateScreen}
        component={isDisabled ? DisabledView : ForumThreadCreateScreen}
        options={{ title: 'New Forum' }}
      />
      <Stack.Screen
        name={ForumStackComponents.forumPostAlertwordScreen}
        component={ForumPostAlertwordScreen}
        options={{ title: 'Alert Keyword' }}
      />
      {CommonScreens(Stack as typeof MainStack)}
    </Stack.Navigator>
  );
};

export const useForumStackNavigation = () => useNavigation<NativeStackNavigationProp<ForumStackParamList>>();

export const useForumStackRoute = () => useRoute<RouteProp<ForumStackParamList>>();

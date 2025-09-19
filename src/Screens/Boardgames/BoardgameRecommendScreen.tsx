import {AppView} from '@tricordarr/Components/Views/AppView';
import {BoardgameRecommendationForm} from '@tricordarr/Components/Forms/BoardgameRecommendationForm';
import {BoardgameData, BoardgameRecommendationData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {FormikHelpers} from 'formik';
import React, {useCallback, useEffect, useState} from 'react';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView';
import {useBoardgameRecommendMutation} from '@tricordarr/Queries/Boardgames/BoardgameMutations';
import {BoardgameFlatList} from '@tricordarr/Components/Lists/BoardgameFlatList';
import {Divider} from 'react-native-paper';
import {View} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {MaterialHeaderButton} from '@tricordarr/Components/Buttons/MaterialHeaderButton';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';
import {MainStackComponents, MainStackParamList} from '@tricordarr/Components/Navigation/Stacks/MainStackNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const defaultValues: BoardgameRecommendationData = {
  numPlayers: 2,
  timeToPlay: 30,
  maxAge: 0,
  complexity: 1,
  minAge: 0,
};

const ListHeader = ({
  initialValues,
  onSubmit,
  games,
}: {
  initialValues: BoardgameRecommendationData;
  onSubmit: (values: BoardgameRecommendationData, helpers: FormikHelpers<BoardgameRecommendationData>) => void;
  games: BoardgameData[];
}) => (
  <>
    <PaddedContentView padTop={true}>
      <BoardgameRecommendationForm initialValues={initialValues} onSubmit={onSubmit} />
    </PaddedContentView>
    {games.length > 0 && <Divider bold={true} />}
  </>
);

type Props = NativeStackScreenProps<MainStackParamList, MainStackComponents.boardgameRecommendScreen>;

export const BoardgameRecommendScreen = ({navigation}: Props) => {
  const guideMutation = useBoardgameRecommendMutation();
  const [games, setGames] = useState<BoardgameData[]>([]);
  const [fieldValues, setFieldValues] = useState<BoardgameRecommendationData>(defaultValues);

  const onSubmit = (values: BoardgameRecommendationData, helpers: FormikHelpers<BoardgameRecommendationData>) => {
    setFieldValues(values);
    guideMutation.mutate(
      {
        recommendationData: values,
      },
      {
        onSuccess: response => {
          setGames(response.data.gameArray);
        },
        onSettled: () => helpers.setSubmitting(false),
      },
    );
  };

  const getHeader = () => <ListHeader onSubmit={onSubmit} initialValues={fieldValues} games={games} />;

  const getNavButtons = useCallback(
    () => (
      <View>
        <HeaderButtons left HeaderButtonComponent={MaterialHeaderButton}>
          <Item
            title={'Help'}
            iconName={AppIcons.help}
            onPress={() => navigation.push(MainStackComponents.boardgameHelpScreen)}
          />
        </HeaderButtons>
      </View>
    ),
    [navigation],
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: getNavButtons,
    });
  }, [getNavButtons, navigation]);

  return (
    <AppView>
      <BoardgameFlatList items={games} listHeader={getHeader} />
    </AppView>
  );
};

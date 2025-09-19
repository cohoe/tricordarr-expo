import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OobeStackComponents, OobeStackParamList} from '@tricordarr/Components/Navigation/Stacks/OobeStackNavigator';
import {AppView} from '@tricordarr/Components/Views/AppView';
import {ScrollingContentView} from '@tricordarr/Components/Views/Content/ScrollingContentView';
import {OobeButtonsView} from '@tricordarr/Components/Views/OobeButtonsView';
import {useConductQuery} from '@tricordarr/Queries/PublicQueries';
import {LoadingView} from '@tricordarr/Components/Views/Static/LoadingView';
import {RefreshControl} from 'react-native';
import {useStyles} from '@tricordarr/Components/Context/Contexts/StyleContext.ts';
import {ContentText} from '@tricordarr/Components/Text/ContentText.tsx';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView.tsx';

type Props = NativeStackScreenProps<OobeStackParamList, OobeStackComponents.oobeConductScreen>;

export const OobeConductScreen = ({navigation}: Props) => {
  const {data, refetch, isFetching} = useConductQuery();
  const {commonStyles} = useStyles();
  if (!data) {
    return <LoadingView onRefresh={refetch} refreshing={isFetching} />;
  }

  return (
    <AppView safeEdges={['bottom']}>
      <ScrollingContentView
        isStack={true}
        style={commonStyles.marginBottomZero}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
        <PaddedContentView>
          <ContentText text={data} forceMarkdown={true} />
        </PaddedContentView>
        <OobeButtonsView
          leftOnPress={() => navigation.goBack()}
          rightText={'I Agree'}
          rightOnPress={() => navigation.push(OobeStackComponents.oobeAccountScreen)}
          rightDisabled={!data}
        />
      </ScrollingContentView>
    </AppView>
  );
};

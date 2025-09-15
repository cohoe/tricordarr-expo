import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OobeStackComponents, OobeStackParamList } from '@tricordarr/components/Navigation/Stacks/OobeStackNavigator';
import { AppView } from '@tricordarr/components/Views/AppView';
import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import { OobeButtonsView } from '@tricordarr/components/Views/OobeButtonsView';
import { useConductQuery } from '@tricordarr/components/Queries/PublicQueries';
import { LoadingView } from '@tricordarr/components/Views/Static/LoadingView';
import { RefreshControl } from 'react-native';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';
import { ContentText } from '@tricordarr/components/Text/ContentText';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';

type Props = NativeStackScreenProps<OobeStackParamList, OobeStackComponents.oobeConductScreen>;

export const OobeConductScreen = ({ navigation }: Props) => {
  const { data, refetch, isFetching } = useConductQuery();
  const { commonStyles } = useStyles();
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

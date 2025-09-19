import React from 'react';
import {Text} from 'react-native-paper';
import {AppView} from '@tricordarr/Components/Views/AppView';
import {ScrollingContentView} from '@tricordarr/Components/Views/Content/ScrollingContentView';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView';

interface NotImplementedViewProps {
  additionalText?: string;
}

export const NotImplementedView = (props: NotImplementedViewProps) => {
  return (
    <AppView>
      <ScrollingContentView>
        <PaddedContentView>
          <Text>This feature is not yet implemented.</Text>
          {props.additionalText && <Text>{props.additionalText}</Text>}
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};

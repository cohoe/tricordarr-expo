import React, {ReactNode} from 'react';
import {List} from 'react-native-paper';
import {ContentText} from '@tricordarr/components/Text/ContentText';
import {useStyles} from '@tricordarr/components/Context/Contexts/StyleContext';

interface ForumCategoryListItemBaseProps {
  title: string;
  description?: string;
  onPress?: () => void;
  right?: () => ReactNode;
}

export const ForumCategoryListItemBase = ({title, description, onPress, right}: ForumCategoryListItemBaseProps) => {
  const {commonStyles} = useStyles();

  const getDescription = () => description && <ContentText textVariant={'bodyMedium'} text={description} />;

  return (
    <List.Item
      title={title}
      titleStyle={commonStyles.bold}
      description={getDescription}
      onPress={onPress}
      right={right}
    />
  );
};

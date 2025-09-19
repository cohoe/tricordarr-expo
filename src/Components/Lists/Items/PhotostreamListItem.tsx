import React, {memo} from 'react';
import {PhotostreamImageData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {APIImage} from '@tricordarr/Components/Images/APIImage';
import {View} from 'react-native';
import {PhotostreamImageHeaderView} from '@tricordarr/Components/Views/Photostream/PhotostreamImageHeaderView';
import {PhotostreamImageBodyView} from '@tricordarr/Components/Views/Photostream/PhotostreamImageBodyView';

interface PhotostreamListItemProps {
  item: PhotostreamImageData;
}

const PhotostreamListItemInternal = ({item}: PhotostreamListItemProps) => {
  return (
    <View>
      <PhotostreamImageHeaderView image={item} />
      <View>
        <APIImage
          mode={'scaledimage'}
          thumbPath={`/image/thumb/${item.image}`}
          fullPath={`/image/full/${item.image}`}
        />
      </View>
      <PhotostreamImageBodyView image={item} />
    </View>
  );
};

export const PhotostreamListItem = memo(PhotostreamListItemInternal);

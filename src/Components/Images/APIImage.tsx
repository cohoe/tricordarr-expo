import {AppImageViewer} from '@tricordarr/Components/Images/AppImageViewer';
import {Image, StyleProp, TouchableOpacity, ImageStyle as RNImageStyle, View} from 'react-native';
import {ActivityIndicator, Card} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {useImageQuery} from '@tricordarr/Queries/ImageQuery';
import {useStyles} from '@tricordarr/Components/Context/Contexts/StyleContext';
import {ImageQueryData} from '@tricordarr/Libraries/Types';
import {AppIcon} from '@tricordarr/Components/Icons/AppIcon';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';
import {useFeature} from '@tricordarr/Components/Context/Contexts/FeatureContext';
import {SwiftarrFeature} from '@tricordarr/Libraries/Enums/AppFeatures';
import {useModal} from '@tricordarr/Components/Context/Contexts/ModalContext';
import {HelpModalView} from '@tricordarr/Components/Views/Modals/HelpModalView';
import {AppFastImage} from '@tricordarr/Components/Images/AppFastImage';
import {ImageStyle as FastImageStyle} from '@d11/react-native-fast-image';
import {useConfig} from '@tricordarr/Components/Context/Contexts/ConfigContext';
// import {saveImageToLocal} from '@tricordarr/Libraries/Storage/ImageStorage.ts';
// import {useErrorHandler} from '@tricordarr/Components/Context/Contexts/ErrorHandlerContext.ts';

interface APIImageProps {
  thumbPath: string;
  fullPath: string;
  style?: StyleProp<FastImageStyle | RNImageStyle>;
  mode?: 'cardcover' | 'image' | 'avatar' | 'scaledimage';
  disableTouch?: boolean;
}

const animatedRegex = new RegExp('\\.(gif)$', 'i');

/**
 * APIImage is for displaying an image from the Swiftarr API.
 *
 * This also includes the AppImageViewer which is the "modal" component that appears when
 * you tap on an image that lets you zoom, download, and other stuff.
 *
 * This shares a lot with AppImage.tsx and some day will likely be replaced by it.
 * It is separate because we need a lot more logic around dynamically fetching the
 * full size image then showing the AppImageViewer in a single press.
 *
 * @param thumbPath URL path to the thumbnail of the image (ex: '/image/thumb/ABC123.jpg').
 * @param fullPath URL path the full file of the image (ex: '/image/full/ABC123.jpg').
 * @param style Custom style props for the image display component.
 * @param mode Underlying component to use for the image display.
 * @constructor
 */
export const APIImage = ({thumbPath, fullPath, style, mode = 'cardcover', disableTouch}: APIImageProps) => {
  const {getIsDisabled} = useFeature();
  const {appConfig} = useConfig();
  // The thumbnails Swiftarr generates are not animated.
  const isAnimated = animatedRegex.test(thumbPath);
  const isDisabled = getIsDisabled(SwiftarrFeature.images);
  const thumbImageQuery = useImageQuery(
    isAnimated ? fullPath : thumbPath,
    appConfig.skipThumbnails ? false : !isDisabled,
  );
  const fullImageQuery = useImageQuery(fullPath, appConfig.skipThumbnails ? !isDisabled : false);
  const {commonStyles} = useStyles();
  const [viewerImages, setViewerImages] = useState<ImageQueryData[]>([]);
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [enableFullQuery, setEnableFullQuery] = useState(false);
  const {setModalContent, setModalVisible} = useModal();
  const [imageQueryData, setImageQueryData] = useState<ImageQueryData>();
  // const {setInfoMessage} = useErrorHandler();

  const handleThumbPress = () => {
    if (fullImageQuery.data) {
      setEnableFullQuery(true);
      return;
    }
    fullImageQuery.refetch().then(() => {
      setEnableFullQuery(true);
    });
  };

  useEffect(() => {
    if (enableFullQuery && fullImageQuery.data) {
      setViewerImages([fullImageQuery.data]);
      setIsViewerVisible(true);
      setEnableFullQuery(false);
    }
  }, [enableFullQuery, fullImageQuery.data]);

  const handleDisableModal = () => {
    setModalContent(
      <HelpModalView
        text={[
          'Images have been disabled by the server admins. This could be for all clients or just Tricordarr. Check the forums, announcements, or Info Desk for more details.',
        ]}
      />,
    );
    setModalVisible(true);
  };

  // The image onLongPress={saveImage} was a little too easy to hit. Disabling
  // until I change my mind.
  // const saveImage = useCallback(async () => {
  //   if (imageQueryData) {
  //     try {
  //       await saveImageToLocal(imageQueryData);
  //       setInfoMessage('Saved to camera roll.');
  //     } catch (error: any) {
  //       console.error(error);
  //       setInfoMessage(error);
  //     }
  //   }
  // }, [imageQueryData, setInfoMessage]);

  useEffect(() => {
    if (fullImageQuery.data) {
      setImageQueryData(fullImageQuery.data);
    } else if (thumbImageQuery.data) {
      setImageQueryData(thumbImageQuery.data);
    }
  }, [fullImageQuery.data, thumbImageQuery.data]);

  if (isDisabled) {
    return (
      <Card.Content style={[commonStyles.marginVerticalSmall]}>
        <AppIcon icon={AppIcons.imageDisabled} onPress={handleDisableModal} />
      </Card.Content>
    );
  }

  if (
    (appConfig.skipThumbnails && (fullImageQuery.isFetching || fullImageQuery.isLoading)) ||
    (!appConfig.skipThumbnails &&
      (thumbImageQuery.isLoading || thumbImageQuery.isFetching || fullImageQuery.isFetching))
  ) {
    return (
      <Card.Content style={[commonStyles.marginVerticalSmall]}>
        <ActivityIndicator />
      </Card.Content>
    );
  }

  if (!imageQueryData) {
    return (
      <Card.Content style={[commonStyles.marginVerticalSmall]}>
        <AppIcon icon={AppIcons.error} />
      </Card.Content>
    );
  }

  return (
    <View>
      <AppImageViewer viewerImages={viewerImages} isVisible={isViewerVisible} setIsVisible={setIsViewerVisible} />
      <TouchableOpacity disabled={disableTouch} activeOpacity={1} onPress={handleThumbPress}>
        {mode === 'cardcover' && (
          <Card.Cover style={style as RNImageStyle} source={ImageQueryData.toImageSource(imageQueryData)} />
        )}
        {mode === 'image' && (
          <Image
            resizeMode={'cover'}
            style={[commonStyles.headerImage, style]}
            source={ImageQueryData.toImageSource(imageQueryData)}
          />
        )}
        {mode === 'scaledimage' && (
          <AppFastImage image={ImageQueryData.toImageURISource(imageQueryData)} style={style as FastImageStyle} />
        )}
      </TouchableOpacity>
    </View>
  );
};

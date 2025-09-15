import React from 'react';
import { AppView } from '@tricordarr/components/Views/AppView';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import { Formik } from 'formik';
import { View } from 'react-native';
import { BooleanField } from '@tricordarr/components/Forms/Fields/BooleanField';
import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import { useConfig } from '@tricordarr/components/Context/Contexts/ConfigContext';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';

export const ImageSettingsScreen = () => {
  const { appConfig, updateAppConfig } = useConfig();
  const { commonStyles } = useStyles();
  const [loadFullFirst, setLoadFullFirst] = React.useState(appConfig.skipThumbnails);

  const handleLoadFullFirst = () => {
    const newvalue = !appConfig.skipThumbnails;
    updateAppConfig({
      ...appConfig,
      skipThumbnails: newvalue,
    });
    setLoadFullFirst(newvalue);
  };

  return (
    <AppView>
      <ScrollingContentView>
        <PaddedContentView padSides={false}>
          <Formik initialValues={{}} onSubmit={() => { }}>
            <View>
              <BooleanField
                name={'skipThumbnails'}
                label={'Load Full-Size Images First'}
                onPress={handleLoadFullFirst}
                style={commonStyles.paddingHorizontal}
                helperText={'Skip loading image thumbnails first and instead load the full-size image.'}
                value={loadFullFirst}
              />
            </View>
          </Formik>
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};

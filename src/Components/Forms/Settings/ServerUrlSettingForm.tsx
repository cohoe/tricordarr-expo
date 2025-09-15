import { ServerUrlFormValues } from '@tricordarr/libraries/Types/FormValues';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { ServerURLValidation } from '@tricordarr/libraries/ValidationSchema';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';
import React from 'react';
import { PrimaryActionButton } from '@tricordarr/components/Buttons/PrimaryActionButton';
import { View } from 'react-native';
import { PickerField } from '@tricordarr/components/Forms/Fields/PickerField';
import { TextField } from '@tricordarr/components/Forms/Fields/TextField';
import { ServerChoices, ServerUrlChoice } from '@tricordarr/libraries/Network/ServerChoices';
import { DirtyDetectionField } from '@tricordarr/components/Forms/Fields/DirtyDetectionField';

interface ServerUrlFormProps {
  initialValues: ServerUrlFormValues;
  onSubmit: (values: ServerUrlFormValues, helpers: FormikHelpers<ServerUrlFormValues>) => void;
  disabled?: boolean;
}

const validationSchema = Yup.object().shape({
  serverUrl: ServerURLValidation,
});

export const ServerUrlSettingForm = (props: ServerUrlFormProps) => {
  const { commonStyles } = useStyles();
  return (
    <Formik initialValues={props.initialValues} onSubmit={props.onSubmit} validationSchema={validationSchema}>
      {({ values, handleSubmit, isSubmitting, isValid, dirty, setFieldValue }) => (
        <View>
          <DirtyDetectionField />
          <View style={[commonStyles.paddingBottom]}>
            <PickerField<ServerUrlChoice>
              name={'serverChoice'}
              label={'Server'}
              value={values.serverChoice}
              choices={ServerChoices.serverChoices}
              getTitle={c => c?.name || 'Unknown'}
              onSelect={c => {
                setFieldValue('serverUrl', c?.serverUrl);
              }}
              disabled={props.disabled}
            />
          </View>
          <TextField
            name={'serverUrl'}
            label={'URL'}
            disabled={values.serverChoice.name !== 'Other'}
            onChangeText={v => {
              setFieldValue('serverUrl', v);
              setFieldValue('serverChoice', { name: 'Other', serverUrl: '' });
            }}
            autoCapitalize={'none'}
          />
          <PrimaryActionButton
            disabled={!isValid || isSubmitting || !dirty}
            isLoading={isSubmitting}
            viewStyle={commonStyles.marginTopSmall}
            onPress={handleSubmit}
            buttonText={'Save'}
          />
        </View>
      )}
    </Formik>
  );
};

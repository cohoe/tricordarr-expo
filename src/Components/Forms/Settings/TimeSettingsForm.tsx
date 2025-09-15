import { CruiseSettingsFormValues, TimeSettingsFormValues } from '@tricordarr/libraries/Types/FormValues';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';
import { View } from 'react-native';
import { DirtyDetectionField } from '@tricordarr/components/Forms/Fields/DirtyDetectionField';
import { TextField } from '@tricordarr/components/Forms/Fields/TextField';
import { PrimaryActionButton } from '@tricordarr/components/Buttons/PrimaryActionButton';
import React from 'react';
import { NumberValidation } from '@tricordarr/libraries/ValidationSchema';

interface TimeSettingsFormProps {
  initialValues: TimeSettingsFormValues;
  onSubmit: (values: TimeSettingsFormValues, helpers: FormikHelpers<TimeSettingsFormValues>) => void;
}

const validationSchema = Yup.object().shape({
  manualTimeOffset: NumberValidation,
});

export const TimeSettingsForm = (props: TimeSettingsFormProps) => {
  const { commonStyles } = useStyles();
  console.log(props.initialValues);

  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validationSchema={validationSchema}
      enableReinitialize={true}>
      {({ handleSubmit, isSubmitting, isValid, dirty }) => (
        <View>
          <DirtyDetectionField />
          <TextField
            name={'manualTimeOffset'}
            label={'Manual Time Zone Offset'}
            keyboardType={'number-pad'}
            infoText={
              "Manually specify the time zone offset from the port time zone. You should only adjust this if you were instructed to do so by THO or the TwitarrTeam. Or you really know what you're doing."
            }
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

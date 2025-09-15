import { View } from 'react-native';
import { TextField } from '@tricordarr/components/Forms/Fields/TextField';
import { PrimaryActionButton } from '@tricordarr/components/Buttons/PrimaryActionButton';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';
import { PreRegistrationSettingsFormValues } from '@tricordarr/libraries/Types/FormValues';
import * as Yup from 'yup';
import { ServerURLValidation } from '@tricordarr/libraries/ValidationSchema';
import { DirtyDetectionField } from '@tricordarr/components/Forms/Fields/DirtyDetectionField';
import { DatePickerField } from '@tricordarr/components/Forms/Fields/DatePickerField';

interface CruiseSettingsFormProps {
  initialValues: PreRegistrationSettingsFormValues;
  onSubmit: (
    values: PreRegistrationSettingsFormValues,
    helpers: FormikHelpers<PreRegistrationSettingsFormValues>,
  ) => void;
}

const validationSchema = Yup.object().shape({
  preRegistrationServerUrl: ServerURLValidation,
  preRegistrationEndDate: Yup.date(),
});

export const PreRegistrationSettingsForm = (props: CruiseSettingsFormProps) => {
  const { commonStyles } = useStyles();
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validationSchema={validationSchema}
      enableReinitialize={true}>
      {({ handleSubmit, isSubmitting, isValid, dirty }) => (
        <View>
          <DirtyDetectionField />
          <TextField name={'preRegistrationServerUrl'} label={'URL'} autoCapitalize={'none'} />
          <DatePickerField name={'preRegistrationEndDate'} label={'End Date'} limitRange={false} />
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

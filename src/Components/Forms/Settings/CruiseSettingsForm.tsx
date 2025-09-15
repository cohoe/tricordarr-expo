import { View } from 'react-native';
import { TextField } from '@tricordarr/components/Forms/Fields/TextField';
import { PrimaryActionButton } from '@tricordarr/components/Buttons/PrimaryActionButton';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';
import { CruiseSettingsFormValues } from '@tricordarr/libraries/Types/FormValues';
import * as Yup from 'yup';
import { DateValidation, NumberValidation } from '@tricordarr/libraries/ValidationSchema';
import { DatePickerField } from '@tricordarr/components/Forms/Fields/DatePickerField';
import { DirtyDetectionField } from '@tricordarr/components/Forms/Fields/DirtyDetectionField';

interface CruiseSettingsFormProps {
  initialValues: CruiseSettingsFormValues;
  onSubmit: (values: CruiseSettingsFormValues, helpers: FormikHelpers<CruiseSettingsFormValues>) => void;
}

const validationSchema = Yup.object().shape({
  portTimeZoneID: Yup.string().required(),
  startDate: DateValidation,
  cruiseLength: NumberValidation,
});

export const CruiseSettingsForm = (props: CruiseSettingsFormProps) => {
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
          <View style={[commonStyles.paddingVertical]}>
            <DatePickerField name={'startDate'} limitRange={false} />
          </View>
          <TextField name={'cruiseLength'} label={'Cruise Length (in days)'} keyboardType={'number-pad'} />
          <TextField name={'portTimeZoneID'} label={'Port Time Zone ID'} />
          <TextField name={'schedBaseUrl'} label={'Sched Base Url'} />
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

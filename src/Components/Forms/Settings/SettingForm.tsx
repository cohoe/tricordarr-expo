import React from 'react';
import { View } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import { PrimaryActionButton } from '@tricordarr/components/Buttons/PrimaryActionButton';
import { SettingFormValues } from '@tricordarr/libraries/Types/FormValues';
import { TextField } from '@tricordarr/components/Forms/Fields/TextField';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';
import { InputModeOptions } from 'react-native/Libraries/Components/TextInput/TextInput';

interface SettingFormProps {
  value: string;
  onSave: (values: SettingFormValues, formikHelpers: FormikHelpers<SettingFormValues>) => void;
  validationSchema?: Object;
  inputMode?: InputModeOptions;
}

export const SettingForm = ({ value, onSave, validationSchema, inputMode }: SettingFormProps) => {
  const { commonStyles } = useStyles();
  const initialFormValues: SettingFormValues = {
    settingValue: value,
  };
  return (
    <Formik enableReinitialize initialValues={initialFormValues} onSubmit={onSave} validationSchema={validationSchema}>
      {({ values, handleSubmit }) => (
        <View>
          <TextField name={'settingValue'} inputMode={inputMode} />
          <PrimaryActionButton
            onPress={handleSubmit}
            buttonText={'Save'}
            style={[commonStyles.marginTopSmall]}
            disabled={values.settingValue === initialFormValues.settingValue}
          />
        </View>
      )}
    </Formik>
  );
};

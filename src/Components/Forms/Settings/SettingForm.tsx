import React from 'react';
import {View} from 'react-native';
import {Formik, FormikHelpers} from 'formik';
import {PrimaryActionButton} from '@tricordarr/Components/Buttons/PrimaryActionButton';
import {SettingFormValues} from '@tricordarr/Libraries/Types/FormValues';
import {TextField} from '@tricordarr/Components/Forms/Fields/TextField';
import {useStyles} from '@tricordarr/Components/Context/Contexts/StyleContext';
import {InputModeOptions} from 'react-native/Libraries/Components/TextInput/TextInput';

interface SettingFormProps {
  value: string;
  onSave: (values: SettingFormValues, formikHelpers: FormikHelpers<SettingFormValues>) => void;
  validationSchema?: Object;
  inputMode?: InputModeOptions;
}

export const SettingForm = ({value, onSave, validationSchema, inputMode}: SettingFormProps) => {
  const {commonStyles} = useStyles();
  const initialFormValues: SettingFormValues = {
    settingValue: value,
  };
  return (
    <Formik enableReinitialize initialValues={initialFormValues} onSubmit={onSave} validationSchema={validationSchema}>
      {({values, handleSubmit}) => (
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

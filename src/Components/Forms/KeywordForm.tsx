import React from 'react';
import { View } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import { PrimaryActionButton } from '@tricordarr/components/Buttons/PrimaryActionButton';
import { KeywordFormValues } from '@tricordarr/libraries/Types/FormValues';
import { TextField } from '@tricordarr/components/Forms/Fields/TextField';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';
import * as Yup from 'yup';
import { KeywordValidation } from '@tricordarr/libraries/ValidationSchema';
import { DirtyDetectionField } from '@tricordarr/components/Forms/Fields/DirtyDetectionField';

const validationSchema = Yup.object().shape({
  keyword: KeywordValidation,
});

interface KeywordFormProps {
  onSave: (values: KeywordFormValues, helpers: FormikHelpers<KeywordFormValues>) => void;
}

const initialFormValues: KeywordFormValues = {
  keyword: '',
};

export const KeywordForm = ({ onSave }: KeywordFormProps) => {
  const { commonStyles } = useStyles();
  return (
    <Formik enableReinitialize initialValues={initialFormValues} onSubmit={onSave} validationSchema={validationSchema}>
      {({ handleSubmit, isSubmitting }) => (
        <View>
          <DirtyDetectionField />
          <TextField autoCapitalize={'none'} name={'keyword'} />
          <PrimaryActionButton
            onPress={handleSubmit}
            buttonText={'Save'}
            style={[commonStyles.marginTopSmall]}
            disabled={isSubmitting}
            isLoading={isSubmitting}
          />
        </View>
      )}
    </Formik>
  );
};

import React from 'react';
import { View } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import { PrimaryActionButton } from '@tricordarr/components/Buttons/PrimaryActionButton';
import { ChangePasswordFormValues } from '@tricordarr/libraries/Types/FormValues';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';
import * as Yup from 'yup';
import { PasswordValidation } from '@tricordarr/libraries/ValidationSchema';
import { SecureTextField } from '@tricordarr/components/Forms/Fields/SecureTextField';
import { DirtyDetectionField } from '@tricordarr/components/Forms/Fields/DirtyDetectionField';

interface ChangePasswordFormProps {
  onSubmit: (values: ChangePasswordFormValues, helpers: FormikHelpers<ChangePasswordFormValues>) => void;
}

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Must provide current password.'),
  newPassword: PasswordValidation,
  newPasswordVerify: Yup.string().oneOf([Yup.ref('newPassword')], 'Passwords must match.'),
});

const initialValues: ChangePasswordFormValues = {
  currentPassword: '',
  newPassword: '',
  newPasswordVerify: '',
};

// https://formik.org/docs/guides/react-native
export const ChangePasswordForm = ({ onSubmit }: ChangePasswordFormProps) => {
  const { commonStyles } = useStyles();
  const styles = {
    inputContainer: [],
    buttonContainer: [commonStyles.marginTopSmall],
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit, values, isSubmitting }) => (
        <View>
          <DirtyDetectionField />
          <SecureTextField name={'currentPassword'} label={'Password'} />
          <SecureTextField name={'newPassword'} label={'New Password'} />
          <SecureTextField name={'newPasswordVerify'} label={'Verify Password'} />
          <PrimaryActionButton
            disabled={!values.currentPassword || !values.newPassword || !values.newPasswordVerify || isSubmitting}
            isLoading={isSubmitting}
            viewStyle={styles.buttonContainer}
            onPress={handleSubmit}
            buttonText={'Change Password'}
          />
        </View>
      )}
    </Formik>
  );
};

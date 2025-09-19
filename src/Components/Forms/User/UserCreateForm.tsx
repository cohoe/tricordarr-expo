import React from 'react';
import {View} from 'react-native';
import {Formik, FormikHelpers} from 'formik';
import {TextInput} from 'react-native-paper';
import {PrimaryActionButton} from '@tricordarr/Components/Buttons/PrimaryActionButton';
import {UserRegistrationFormValues} from '@tricordarr/Libraries/Types/FormValues';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';
import {useStyles} from '@tricordarr/Components/Context/Contexts/StyleContext';
import * as Yup from 'yup';
import {TextField} from '@tricordarr/Components/Forms/Fields/TextField';
import {PasswordValidation, RecoveryKeyValidation, UsernameValidation} from '@tricordarr/Libraries/ValidationSchema';
import {SecureTextField} from '@tricordarr/Components/Forms/Fields/SecureTextField';
import {DirtyDetectionField} from '@tricordarr/Components/Forms/Fields/DirtyDetectionField';

interface UserCreateFormProps {
  onSubmit: (values: UserRegistrationFormValues, helpers: FormikHelpers<UserRegistrationFormValues>) => void;
}

const validationSchema = Yup.object().shape({
  // This is 7 for the space that often comes with a copy+paste from the emails.
  verification: RecoveryKeyValidation,
  username: UsernameValidation,
  password: PasswordValidation,
  passwordVerify: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match.'),
});

const initialValues: UserRegistrationFormValues = {
  username: '',
  password: '',
  passwordVerify: '',
  verification: '',
};

// https://formik.org/docs/guides/react-native
export const UserCreateForm = ({onSubmit}: UserCreateFormProps) => {
  const {commonStyles} = useStyles();
  const styles = {
    inputContainer: [],
    buttonContainer: [commonStyles.marginTopSmall],
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({handleSubmit, values, isSubmitting, isValid}) => (
        <View>
          <DirtyDetectionField />
          <TextField
            viewStyle={styles.inputContainer}
            name={'verification'}
            label={'Registration Code'}
            left={<TextInput.Icon icon={AppIcons.registrationCode} />}
            autoCapitalize={'characters'}
            maxLength={7}
          />
          <TextField
            viewStyle={styles.inputContainer}
            name={'username'}
            label={'Username'}
            left={<TextInput.Icon icon={AppIcons.user} />}
            autoCapitalize={'none'}
          />
          <SecureTextField name={'password'} label={'Password'} />
          <SecureTextField name={'passwordVerify'} label={'Verify Password'} />
          <PrimaryActionButton
            disabled={
              !values.username ||
              !values.password ||
              !values.passwordVerify ||
              !values.verification ||
              !isValid ||
              isSubmitting
            }
            isLoading={isSubmitting}
            viewStyle={styles.buttonContainer}
            onPress={handleSubmit}
            buttonText={'Create'}
          />
        </View>
      )}
    </Formik>
  );
};

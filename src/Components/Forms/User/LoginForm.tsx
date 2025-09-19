import React from 'react';
import {View} from 'react-native';
import {Formik, FormikHelpers} from 'formik';
import {TextInput} from 'react-native-paper';
import {PrimaryActionButton} from '@tricordarr/Components/Buttons/PrimaryActionButton'; 
import {LoginFormValues} from '@tricordarr/Libraries/Types/FormValues';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';
import {useStyles} from '@tricordarr/Components/Context/Contexts/StyleContext';
import * as Yup from 'yup';
import {TextField} from '@tricordarr/Components/Forms/Fields/TextField';
import {PasswordValidation, UsernameValidation} from '@tricordarr/Libraries/ValidationSchema';
import {useAppTheme} from '@tricordarr/Styles/Theme';
import {CommonStackComponents, useCommonStack} from '@tricordarr/Components/Navigation/CommonScreens';
import {SecureTextField} from '@tricordarr/Components/Forms/Fields/SecureTextField';

interface LoginFormProps {
  onSubmit: (values: LoginFormValues, helpers: FormikHelpers<LoginFormValues>) => void;
}

const validationSchema = Yup.object().shape({
  username: UsernameValidation,
  password: PasswordValidation,
});

const initialValues: LoginFormValues = {
  username: '',
  password: '',
};

// https://formik.org/docs/guides/react-native
export const LoginForm = ({onSubmit}: LoginFormProps) => {
  const {commonStyles} = useStyles();
  const styles = {
    inputContainer: [],
    buttonContainer: [commonStyles.marginTopSmall, commonStyles.marginBottom],
  };
  const theme = useAppTheme();
  const commonNavigation = useCommonStack();

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({handleSubmit, values, isSubmitting}) => (
        <View>
          <TextField
            viewStyle={styles.inputContainer}
            name={'username'}
            label={'Username'}
            left={<TextInput.Icon icon={AppIcons.user} />}
            autoCapitalize={'none'}
          />
          <SecureTextField name={'password'} label={'Password'} />
          <PrimaryActionButton
            disabled={!values.username || !values.password || isSubmitting}
            isLoading={isSubmitting}
            viewStyle={styles.buttonContainer}
            onPress={handleSubmit}
            buttonText={'Login'}
          />
          <PrimaryActionButton
            buttonText={'Forgot Password'}
            onPress={() => commonNavigation.push(CommonStackComponents.accountRecoveryScreen)}
            viewStyle={styles.buttonContainer}
            buttonColor={theme.colors.twitarrNeutralButton}
          />
        </View>
      )}
    </Formik>
  );
};

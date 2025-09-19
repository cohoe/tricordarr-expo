import React from 'react';
import {View} from 'react-native';
import {Formik, FormikHelpers} from 'formik';
import {TextInput} from 'react-native-paper';
import {PrimaryActionButton} from '@tricordarr/Components/Buttons/PrimaryActionButton';
import {ChangeUsernameFormValues} from '@tricordarr/Libraries/Types/FormValues';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';
import {useStyles} from '@tricordarr/Components/Context/Contexts/StyleContext';
import * as Yup from 'yup';
import {TextField} from '@tricordarr/Components/Forms/Fields/TextField';
import {UsernameValidation} from '@tricordarr/Libraries/ValidationSchema';
import {DirtyDetectionField} from '@tricordarr/Components/Forms/Fields/DirtyDetectionField';

interface ChangeUsernameFormProps {
  onSubmit: (values: ChangeUsernameFormValues, helpers: FormikHelpers<ChangeUsernameFormValues>) => void;
}

const validationSchema = Yup.object().shape({
  username: UsernameValidation,
});

const initialValues: ChangeUsernameFormValues = {
  username: '',
};

// https://formik.org/docs/guides/react-native
export const ChangeUsernameForm = ({onSubmit}: ChangeUsernameFormProps) => {
  const {commonStyles} = useStyles();
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({handleSubmit, values, isSubmitting}) => (
        <View>
          <DirtyDetectionField />
          <TextField name={'username'} label={'Username'} left={<TextInput.Icon icon={AppIcons.user} />} />
          <PrimaryActionButton
            disabled={!values.username || isSubmitting}
            isLoading={isSubmitting}
            viewStyle={[commonStyles.marginTopSmall]}
            onPress={handleSubmit}
            buttonText={'Save'}
          />
        </View>
      )}
    </Formik>
  );
};

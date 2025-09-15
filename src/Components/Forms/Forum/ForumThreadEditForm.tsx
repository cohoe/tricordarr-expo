import { TextField } from '@tricordarr/components/Forms/Fields/TextField';
import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import { ForumData } from '@tricordarr/libraries/Structs/ControllerStructs';
import * as Yup from 'yup';
import { InfoStringValidation } from '@tricordarr/libraries/ValidationSchema';
import { View } from 'react-native';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';
import { PrimaryActionButton } from '@tricordarr/components/Buttons/PrimaryActionButton';
import { ForumThreadValues } from '@tricordarr/libraries/Types/FormValues';
import { DirtyDetectionField } from '@tricordarr/components/Forms/Fields/DirtyDetectionField';

interface ForumThreadEditFormProps {
  forumData: ForumData;
  onSubmit: (values: ForumThreadValues, helpers: FormikHelpers<ForumThreadValues>) => void;
}

const validationSchema = Yup.object().shape({
  title: InfoStringValidation,
});

export const ForumThreadEditForm = ({ forumData, onSubmit }: ForumThreadEditFormProps) => {
  const { commonStyles } = useStyles();
  const initialValues: ForumThreadValues = {
    title: forumData.title,
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit, isSubmitting, isValid }) => (
        <View>
          <DirtyDetectionField />
          <TextField name={'title'} label={'Title'} />
          <PrimaryActionButton
            disabled={isSubmitting || !isValid}
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

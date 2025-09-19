import React, {useEffect} from 'react';
import {Formik, FormikHelpers, FormikProps, useFormikContext} from 'formik';
import {FezContentData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {BooleanField} from '@tricordarr/Components/Forms/Fields/BooleanField';
import {AppIcons} from '@tricordarr/Libraries/Enums/Icons';
import {PaddedContentView} from '@tricordarr/Components/Views/Content/PaddedContentView';
import {FezType} from '@tricordarr/Libraries/Enums/FezType';
import {UserChipsField} from '@tricordarr/Components/Forms/Fields/UserChipsField';
import {usePrivilege} from '@tricordarr/Components/Context/Contexts/PrivilegeContext';
import * as Yup from 'yup';
import {TextField} from '@tricordarr/Components/Forms/Fields/TextField';
import {DirtyDetectionField} from '@tricordarr/Components/Forms/Fields/DirtyDetectionField';
import {SeamailFormValues} from '@tricordarr/Libraries/Types/FormValues';

interface SeamailCreateFormProps {
  onSubmit: (values: SeamailFormValues, formikBag: FormikHelpers<SeamailFormValues>) => void;
  formRef: React.RefObject<FormikProps<SeamailFormValues>>;
  initialValues: SeamailFormValues;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Subject cannot be empty.'),
});

const InnerSeamailCreateForm = () => {
  const {values, setFieldValue} = useFormikContext<FezContentData>();
  const {setAsModerator, setAsTwitarrTeam, clearPrivileges, hasTwitarrTeam, hasModerator} = usePrivilege();

  useEffect(() => {
    if (values.createdByModerator !== undefined) {
      setAsModerator(values.createdByModerator);
    }
    if (values.createdByTwitarrTeam !== undefined) {
      setAsTwitarrTeam(values.createdByTwitarrTeam);
    }
    // return () => clearPrivileges();
  }, [values, setAsModerator, setAsTwitarrTeam, clearPrivileges]);

  return (
    <PaddedContentView>
      <DirtyDetectionField />
      <UserChipsField name={'initialUsers'} label={'Participants'} />
      <TextField name={'title'} label={'Subject'} />
      <BooleanField
        name={'fezType'}
        label={'Open Chat'}
        helperText={'Allows you to add or remove users later.'}
        onPress={() => setFieldValue('fezType', values.fezType === FezType.open ? FezType.closed : FezType.open)}
        value={values.fezType === FezType.open}
      />
      {hasModerator && (
        <BooleanField
          name={'createdByModerator'}
          label={'Post as Moderator'}
          icon={AppIcons.moderator}
          helperText={'This will also create the seamail as the Moderator user.'}
        />
      )}
      {hasTwitarrTeam && (
        <BooleanField
          name={'createdByTwitarrTeam'}
          label={'Post as TwitarrTeam'}
          icon={AppIcons.twitarteam}
          helperText={'This will also create the seamail as the TwitarrTeam user.'}
        />
      )}
    </PaddedContentView>
  );
};

export const SeamailCreateForm = ({onSubmit, formRef, initialValues}: SeamailCreateFormProps) => {
  return (
    <Formik
      innerRef={formRef}
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      <InnerSeamailCreateForm />
    </Formik>
  );
};

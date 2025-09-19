import {AppView} from '@tricordarr/../../Views/AppView';
import {ScrollingContentView} from '@tricordarr/../../Views/Content/ScrollingContentView';
import React, {useState} from 'react';
import {UserRecoveryForm} from '@tricordarr/../../Forms/User/UserRecoveryForm.tsx';
import {UserRegistrationFormValues} from '@tricordarr/../../../Libraries/Types/FormValues';
import {FormikHelpers} from 'formik';
import {PaddedContentView} from '@tricordarr/../../Views/Content/PaddedContentView';
import {useUserRecoveryMutation} from '@tricordarr/../../Queries/Auth/RecoveryMutations.ts';
import {TokenStringData} from '@tricordarr/../../../Libraries/Structs/ControllerStructs';
import {Text} from 'react-native-paper';
import {PrimaryActionButton} from '@tricordarr/../../Buttons/PrimaryActionButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommonStackComponents, CommonStackParamList} from '@tricordarr/../../Navigation/CommonScreens';

type Props = NativeStackScreenProps<CommonStackParamList, CommonStackComponents.accountRecoveryScreen>;

export const AccountRecoveryScreen = ({navigation}: Props) => {
  const recoveryMutation = useUserRecoveryMutation();
  const [tokenData, setTokenData] = useState<TokenStringData>();
  const onSubmit = (values: UserRegistrationFormValues, helpers: FormikHelpers<UserRegistrationFormValues>) => {
    recoveryMutation.mutate(
      {
        username: values.username,
        recoveryKey: values.verification,
        newPassword: values.password,
      },
      {
        onSuccess: response => {
          setTokenData(response.data);
        },
        onSettled: () => helpers.setSubmitting(false),
      },
    );
  };

  if (tokenData) {
    return (
      <AppView>
        <ScrollingContentView>
          <PaddedContentView>
            <Text>Successfully recovered your account! Please go back and log in with your new password.</Text>
          </PaddedContentView>
          <PaddedContentView>
            <PrimaryActionButton buttonText={'Back to Login'} onPress={() => navigation.goBack()} />
          </PaddedContentView>
        </ScrollingContentView>
      </AppView>
    );
  }

  return (
    <AppView>
      <ScrollingContentView>
        <PaddedContentView>
          <UserRecoveryForm onSubmit={onSubmit} />
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};

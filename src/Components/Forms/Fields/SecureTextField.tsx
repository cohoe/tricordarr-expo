import { TextInput } from 'react-native-paper';
import { AppIcons } from '@tricordarr/libraries/Enums/Icons';
import { TextField } from '@tricordarr/components/Forms/Fields/TextField';
import React from 'react';

interface SecureTextFieldProps {
  name: string;
  label: string;
}

export const SecureTextField = (props: SecureTextFieldProps) => {
  const [secure, setSecure] = React.useState(true);
  const onBlur = () => {
    setSecure(true);
  };
  return (
    <TextField
      name={props.name}
      label={props.label}
      left={<TextInput.Icon icon={AppIcons.password} />}
      right={<TextInput.Icon onPress={() => setSecure(!secure)} icon={secure ? AppIcons.show : AppIcons.hide} />}
      secureTextEntry={secure}
      onBlur={onBlur}
    />
  );
};

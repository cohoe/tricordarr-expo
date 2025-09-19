import {useAppTheme} from '@tricordarr/Styles/Theme';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {GestureResponderEvent} from 'react-native';
import {usePrivilege} from '@tricordarr/Components/Context/Contexts/PrivilegeContext';
import {FabGroupActionType} from '@tricordarr/Libraries/Types';

interface Props {
  icon: IconSource;
  label?: string;
  onPress: (e: GestureResponderEvent) => void;
  color?: string;
  backgroundColor?: string;
}

export const FabGroupAction = ({icon, label, onPress, backgroundColor, color}: Props): FabGroupActionType => {
  const theme = useAppTheme();
  const {asPrivilegedUser} = usePrivilege();

  const actionColor = asPrivilegedUser ? theme.colors.onTwitarrNegativeButton : color ? color : theme.colors.inverseOnSurface;
  const actionBackgroundColor = asPrivilegedUser
    ? theme.colors.twitarrNegativeButton
    : backgroundColor
    ? backgroundColor
    : theme.colors.inverseSurface;

  return {
    icon: icon,
    label: label,
    color: actionColor,
    style: {
      backgroundColor: actionBackgroundColor,
    },
    onPress: onPress,
  };
};

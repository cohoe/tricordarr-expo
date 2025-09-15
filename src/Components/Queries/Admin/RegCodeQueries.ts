import {useTokenAuthQuery} from '@tricordarr/components/Queries/TokenAuthQuery';
import {RegistrationCodeUserData} from '@tricordarr/libraries/Structs/ControllerStructs';

export const useRegCodeForUserQuery = ({userID}: {userID: string}) => {
  return useTokenAuthQuery<RegistrationCodeUserData>(`/admin/regcodes/findbyuser/${userID}`);
};

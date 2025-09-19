import {useTokenAuthQuery} from '@tricordarr/Queries/TokenAuthQuery';
import {RegistrationCodeUserData} from '@tricordarr/Libraries/Structs/ControllerStructs';

export const useRegCodeForUserQuery = ({userID}: {userID: string}) => {
  return useTokenAuthQuery<RegistrationCodeUserData>(`/admin/regcodes/findbyuser/${userID}`);
};

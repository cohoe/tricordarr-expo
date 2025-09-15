import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserProfileScreenBase } from '@tricordarr/components/Screens/User/UserProfileScreenBase';
import { CommonStackComponents, CommonStackParamList } from '@tricordarr/components/Navigation/CommonScreens';
import { useUserFindQuery, useUsersProfileQuery } from '@tricordarr/components/Queries/Users/UsersQueries';

type Props = NativeStackScreenProps<CommonStackParamList, CommonStackComponents.usernameProfileScreen>;

export const UsernameProfileScreen = ({ route }: Props) => {
  const [userID, setUserID] = useState('');
  const { data: lookupData } = useUserFindQuery(route.params.username);
  const { data, refetch, isLoading } = useUsersProfileQuery(userID, {
    enabled: !!userID,
  });

  useEffect(() => {
    if (lookupData) {
      setUserID(lookupData.userID);
    }
  }, [lookupData]);

  return <UserProfileScreenBase data={data} refetch={refetch} isLoading={isLoading} />;
};

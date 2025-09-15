import { AppView } from '@tricordarr/components/Views/AppView';
import { ScrollingContentView } from '@tricordarr/components/Views/Content/ScrollingContentView';
import { Card, Text } from 'react-native-paper';
import React from 'react';
import { useRegCodeForUserQuery } from '@tricordarr/components/Queries/Admin/RegCodeQueries';
import { useModal } from '@tricordarr/components/Context/Contexts/ModalContext';
import { PaddedContentView } from '@tricordarr/components/Views/Content/PaddedContentView';
import { UserListItem } from '@tricordarr/components/Lists/Items/UserListItem';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonStackComponents, CommonStackParamList } from '@tricordarr/components/Navigation/CommonScreens';

type Props = NativeStackScreenProps<CommonStackParamList, CommonStackComponents.userRegCodeScreen>;

export const UserRegCodeScreen = ({ route, navigation }: Props) => {
  const { data } = useRegCodeForUserQuery({ userID: route.params.userID });
  const { setModalVisible } = useModal();

  const handleUserPress = (pressedUserID: string) => {
    setModalVisible(false);
    navigation.push(CommonStackComponents.userProfileScreen, {
      userID: pressedUserID,
    });
  };

  return (
    <AppView>
      <ScrollingContentView>
        <PaddedContentView>
          <Card>
            <Card.Title title={'Code'} />
            <Card.Content>{data && <Text selectable={true}>{data.regCode.toUpperCase()}</Text>}</Card.Content>
          </Card>
        </PaddedContentView>
        <PaddedContentView>
          <Card>
            <Card.Title title={'Related Accounts'} />
            <Card.Content>
              {data &&
                data.users.map((user, index) => {
                  return <UserListItem key={index} userHeader={user} onPress={() => handleUserPress(user.userID)} />;
                })}
            </Card.Content>
          </Card>
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};

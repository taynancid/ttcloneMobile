import React, {useEffect, useState} from 'react';
import {View, Image, TextInput, Text} from 'react-native';
import {useSelector} from 'react-redux';
import BackArrowButton from '../../components/BackArrowButton';
import {ScrollView} from 'react-native-gesture-handler';

// import { Container } from './styles';

const BLUE = '#428AF8';
const LIGHT_GRAY = '#D3D3D3';

export default function UserUpdate(props) {
  const {user} = useSelector(state => state);
  const [username, setUsername] = useState(user.data.username);

  const navigationOptions = ({navigation}) => {
    return {
      headerLeft: () => <BackArrowButton />,
      headerStyle: {
        elevation: 0, //remove shadow on Android
        borderBottomWidth: 0, //remove shadow on iOS
        shadowColor: 0,
      },
      headerTitle: 'Edit Profile',
      headerRight: () => <Text>Salvar</Text>,
    };
  };

  useEffect(() => {
    props.navigation.setOptions(navigationOptions(props));
    console.log(user);
  }, [props, user]);

  return (
    <View flex={1}>
      <View>
        <Image
          style={{
            width: '100%',
            height: 120,
          }}
          source={{uri: user.data?.avatar_url}}
        />
        <Image
          style={{
            borderRadius: 50,
            width: 80,
            height: 80,
            borderWidth: 4,
            borderColor: 'white',
            position: 'absolute',
            left: 10,
            top: 80,
          }}
          source={{uri: user.data?.avatar_url}}
        />
      </View>
      <View
        style={{
          marginTop: 60,
        }}>
        <View
          style={{
            paddingHorizontal: 10,
          }}>
          <Text>Name</Text>
          <TextInput
            value={username}
            placeholder="Cannot be blank"
            onChangeText={setUsername}
            selectionColor={BLUE}
            style={{
              height: 40,
              borderBottomWidth: 1,
              borderBottomColor: BLUE,
            }}
          />
        </View>
        <TextInput
          value={username}
          placeholder="Cannot be blank"
          onChangeText={setUsername}
          selectionColor={BLUE}
          style={{
            height: 40,
            marginHorizontal: 10,
            borderBottomWidth: 1,
            borderBottomColor: BLUE,
          }}
        />
      </View>
    </View>
  );
}

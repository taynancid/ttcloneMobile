import React, {useEffect, useState} from 'react';
import {View, Image, TextInput, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import BackArrowButton from '../../components/BackArrowButton';
import ImagePicker from 'react-native-image-picker';

// import { Container } from './styles';

const BLUE = '#428AF8';
const LIGHT_GRAY = '#D3D3D3';

export default function UserUpdate(props) {
  const {user} = useSelector(state => state);
  const [username, setUsername] = useState(user.data.username);
  const [avatarURI, setAvatarURI] = useState(null);

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

  const chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        setAvatarURI(source.uri);
      }
    });
  };

  return (
    <View flex={1}>
      <View>
        <TouchableOpacity onPress={chooseFile}>
          <Image
            style={{
              width: '100%',
              height: 120,
            }}
            source={{uri: avatarURI ? avatarURI : user.data?.cover_url}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{position: 'absolute', left: 10, top: 80}}
          onPress={chooseFile}>
          <Image
            style={{
              borderRadius: 50,
              width: 80,
              height: 80,
              borderWidth: 4,
              borderColor: 'white',
            }}
            source={{uri: avatarURI ? avatarURI : user.data?.avatar_url}}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 60,
        }}>
        <View
          style={{
            marginTop: 10,
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
      </View>
    </View>
  );
}

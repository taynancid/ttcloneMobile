import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import api from '../../services/api';
import BackArrowButton from '../../components/BackArrowButton';
import MaterialIconsIcons from 'react-native-vector-icons/MaterialIcons';
import userActions from '../../store/actions/user';

const BLUE = '#428AF8';
const LIGHT_GRAY = '#D3D3D3';

export default function UserUpdate(props) {
  const {user} = useSelector(state => state);
  const [username, setUsername] = useState(user.data.username);
  const [bio, setBio] = useState(user.data.bio);
  const [avatarURI, setAvatarURI] = useState(null);
  const [coverURI, setCoverURI] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const navigationOptions = ({navigation}) => {
    return {
      headerLeft: () => <BackArrowButton />,
      headerStyle: {
        elevation: 0, //remove shadow on Android
        borderBottomWidth: 0, //remove shadow on iOS
        shadowColor: 0,
      },
      headerTitle: 'Edit Profile',
      headerRight: () => (
        <View style={{marginRight: 10}}>
          {!isLoading ? (
            <TouchableOpacity onPress={() => handleUpdate()}>
              <Text>Salvar</Text>
            </TouchableOpacity>
          ) : (
            <ActivityIndicator />
          )}
        </View>
      ),
    };
  };

  useEffect(() => {
    props.navigation.setOptions(navigationOptions(props));
  }, [navigationOptions, props, user, isLoading]);

  const chooseFile = addPicture => {
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
        addPicture(source.uri);
      }
    });
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);

      const body = new FormData();

      body.append('username', username);
      if (bio) {
        body.append('bio', bio);
      }

      if (avatarURI) {
        body.append('profile_pic', {
          name: `avatar-${new Date()}.jpg`,
          uri: avatarURI,
        });
      }

      if (coverURI) {
        body.append('cover_pic', {
          name: `cover-${new Date()}.jpg`,
          uri: coverURI,
        });
      }

      const {data} = await api.put('users', body);
      console.log(data);
      //dispatch(userActions.setUser(data.user));
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  return (
    <View flex={1}>
      <View>
        <TouchableOpacity onPress={() => chooseFile(setCoverURI)}>
          <View
            style={{
              width: '100%',
              height: 120,
            }}>
            <ImageBackground
              style={{
                width: '100%',
                height: 120,
                backgroundColor: 'rgb(0,0,0)',
              }}
              imageStyle={{opacity: 0.4}}
              source={{uri: coverURI ? coverURI : user.data?.full_cover_url}}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  top: 50,
                }}>
                <MaterialIconsIcons
                  name="add-a-photo"
                  size={26}
                  color="white"
                />
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 10,
            top: 80,
            backgroundColor: 'white',
            borderRadius: 50,
          }}
          onPress={() => chooseFile(setAvatarURI)}>
          <ImageBackground
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
              backgroundColor: 'rgb(0,0,0)',
            }}
            imageStyle={{
              borderRadius: 50,
              borderWidth: 4,
              borderColor: 'white',
              opacity: 0.4,
            }}
            source={{uri: avatarURI ? avatarURI : user.data?.avatar_url}}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                top: 25,
              }}>
              <MaterialIconsIcons name="add-a-photo" size={26} color="white" />
            </View>
          </ImageBackground>
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
        <View
          style={{
            marginTop: 10,
            paddingHorizontal: 10,
          }}>
          <Text>Bio</Text>
          <TextInput
            value={bio}
            placeholder="Add a bio"
            onChangeText={setBio}
            selectionColor={BLUE}
            style={{
              height: 80,
              borderBottomWidth: 1,
              borderBottomColor: BLUE,
            }}
            multiline={true}
            numberOfLines={5}
          />
        </View>
      </View>
    </View>
  );
}

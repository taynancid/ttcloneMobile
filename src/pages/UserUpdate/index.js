import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import api from '../../services/api';
import BackArrowButton from '../../components/BackArrowButton';
import MaterialIconsIcons from 'react-native-vector-icons/MaterialIcons';
import userActions from '../../store/actions/user';

const BLUE = '#428AF8';
const LIGHT_GRAY = '#D3D3D3';
const HEADER_HEIGHT = 160;
const AVATAR_HEIGHT = 80;

export default function UserUpdate(props) {
  const {user} = useSelector(state => state);
  const [username, setUsername] = useState(user.data.username);
  const [name, setName] = useState(user.data.name);
  const [bio, setBio] = useState(user.data.bio);
  const [birth, setBirth] = useState(
    user.data?.birthday_date ? user.data?.birthday_date : null,
  );
  const [birthModalVisible, setBirthModalVisible] = useState(false);
  const [avatarURI, setAvatarURI] = useState(null);
  const [coverURI, setCoverURI] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigationOptions = useCallback(
    ({navigation}) => {
      return {
        headerLeft: () => <BackArrowButton onPress={navigation.goBack} />,
        headerStyle: {
          elevation: 0, //remove shadow on Android
          borderBottomWidth: 0, //remove shadow on iOS
          shadowColor: 0,
          backgroundColor: '#243447',
        },
        headerTitle: <Text style={{color: 'white'}}>Edit Profile</Text>,
        headerRight: () => (
          <View style={{marginRight: 10}}>
            {!isLoading ? (
              <TouchableOpacity onPress={() => handleUpdate()}>
                <Text style={{color: 'white'}}>Salvar</Text>
              </TouchableOpacity>
            ) : (
              <ActivityIndicator />
            )}
          </View>
        ),
      };
    },
    [handleUpdate, isLoading],
  );

  useEffect(() => {
    props.navigation.setOptions(navigationOptions(props));
  }, [props, user, isLoading, navigationOptions]);

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

  const handleSetBirth = value => {
    setBirth(value);
    setBirthModalVisible(false);
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);

      const body = new FormData();

      body.append('username', username);

      if (name) {
        body.append('name', name);
      }
      if (bio) {
        body.append('bio', bio);
      }
      if (birth) {
        body.append('birthday_date', moment(birth).format('LL'));
        console.log(body);
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
    <View style={{flex: 1, backgroundColor: '#243447'}}>
      <View>
        <TouchableOpacity onPress={() => chooseFile(setCoverURI)}>
          <View
            style={{
              width: '100%',
              height: HEADER_HEIGHT,
            }}>
            <ImageBackground
              style={{
                width: '100%',
                height: HEADER_HEIGHT - AVATAR_HEIGHT / 2,
                backgroundColor: 'rgb(0,0,0)',
              }}
              imageStyle={{opacity: 0.4}}
              source={{uri: coverURI ? coverURI : user.data?.full_cover_url}}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  top: HEADER_HEIGHT / 3,
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
            top: AVATAR_HEIGHT,
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
          <Text style={{color: '#8899A6'}}>Username</Text>
          <TextInput
            value={username}
            placeholder="Cannot be blank"
            onChangeText={setUsername}
            selectionColor={BLUE}
            style={{
              height: 40,
              borderBottomWidth: 1,
              borderBottomColor: BLUE,
              color: 'white',
            }}
          />
        </View>
        <View
          style={{
            marginTop: 10,
            paddingHorizontal: 10,
          }}>
          <Text style={{color: '#8899A6'}}>Name</Text>
          <TextInput
            value={name}
            placeholder="Cannot be blank"
            onChangeText={setName}
            selectionColor={BLUE}
            style={{
              height: 40,
              borderBottomWidth: 1,
              borderBottomColor: BLUE,
              color: 'white',
            }}
          />
        </View>
        <View
          style={{
            marginTop: 15,
            paddingHorizontal: 10,
          }}>
          <Text style={{color: '#8899A6'}}>Bio</Text>
          <TextInput
            value={bio}
            placeholder="Add a bio"
            onChangeText={setBio}
            selectionColor={BLUE}
            style={{
              height: 80,
              borderBottomWidth: 1,
              borderBottomColor: BLUE,
              color: 'white',
            }}
            multiline={true}
            numberOfLines={5}
          />
        </View>
        <DateTimePickerModal
          isVisible={birthModalVisible}
          mode="date"
          onConfirm={handleSetBirth}
          onCancel={() => setBirthModalVisible(false)}
        />
        <View
          style={{
            marginTop: 15,
            paddingHorizontal: 10,
          }}>
          <Text style={{color: '#8899A6'}}>Birth date</Text>
          <TouchableOpacity
            onPress={() => setBirthModalVisible(true)}
            style={{
              height: 40,
              borderBottomColor: BLUE,
              borderBottomWidth: 1,
              justifyContent: 'flex-end',
              paddingVertical: 10,
              color: 'white',
            }}>
            {birth ? (
              <Text style={{color: 'white'}}>{moment(birth).format('L')}</Text>
            ) : (
              <Text>add a date</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// centeredView: {
//   flex: 1,
//   justifyContent: "center",
//   alignItems: "center",
//   marginTop: 22
// },
// modalView: {
//   margin: 20,
//   backgroundColor: "white",
//   borderRadius: 20,
//   padding: 35,
//   alignItems: "center",
//   shadowColor: "#000",
//   shadowOffset: {
//     width: 0,
//     height: 2
//   },
//   shadowOpacity: 0.25,
//   shadowRadius: 3.84,
//   elevation: 5
// },

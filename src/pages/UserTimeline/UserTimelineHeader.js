import React from 'react';
import {View, SafeAreaView, Image, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';

import authActions from '../../store/actions/auth';

const HEADER_HEIGHT = 160;

const UserTimelineHeader = props => {
  const {user} = useSelector(state => state);

  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@ttclone:token');
      dispatch(authActions.logOut());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        height: HEADER_HEIGHT,
      }}>
      <Image
        style={{
          width: '100%',
          height: 120,
        }}
        source={{uri: user.data?.full_cover_url}}
      />
      <View
        style={{
          position: 'absolute',
          top: HEADER_HEIGHT / 2,
          left: 10,
        }}>
        <Image
          style={{
            width: 80,
            height: 80,
            borderRadius: 50,
            borderWidth: 4,
            borderColor: 'white',
          }}
          source={{uri: user.data?.avatar_url}}
        />
      </View>
      <View alignItems="flex-end">
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={logout}>
            <EntypoIcons name="log-out" size={20} color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderRadius: 50,
              borderColor: '#1DA1F2',
              paddingVertical: 5,
              paddingHorizontal: 9,
              margin: 5,
            }}
            onPress={() => props.navigation.navigate('UserUpdateScreen')}>
            <Text style={{fontWeight: 'bold', color: '#1DA1F2'}}>
              Edit profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserTimelineHeader;

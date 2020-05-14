import React from 'react';
import {View, SafeAreaView, Image, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

// import { Container } from './styles';

const HEADER_HEIGHT = 160;

const UserTimelineHeader = props => {
  const {user} = useSelector(state => state);

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
  );
};

export default UserTimelineHeader;

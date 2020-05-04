import React from 'react';
import {View, SafeAreaView, Image, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

// import { Container } from './styles';

const UserTimelineHeader = props => {
  const {user} = useSelector(state => state);

  return (
    <>
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
          left: 10,
          top: 120,
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
            borderColor: 'gray',
            paddingVertical: 5,
            paddingHorizontal: 9,
            margin: 5,
          }}
          onPress={() => props.navigation.navigate('UserUpdateScreen')}>
          <Text style={{fontWeight: 'bold', color: 'gray'}}>Edit profile</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default UserTimelineHeader;

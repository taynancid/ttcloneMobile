import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';
import {useSelector} from 'react-redux';

export default function TweetContainer(props) {
  const {item} = props.userData;
  const {user} = useSelector(state => state);
  const [isFollowing, setIsFollowing] = useState(checkIsFollowing);

  const checkIsFollowing = () => {
    const isAlreadyFollowing = item.followers.find(
      element => element.id === user.data.id,
    );

    return !!isAlreadyFollowing;
  };

  const handleFollow = async idToFollow => {
    try {
      setIsFollowing(true);
      const {data} = await api.post(`follow/${idToFollow}`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUnfollow = async idToUnfollow => {
    try {
      setIsFollowing(false);
      const {data} = await api.delete(`follow/${idToUnfollow}`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFollowButton = () => {
    if (isFollowing) {
      return (
        <TouchableOpacity
          style={{
            borderRadius: 50,
            backgroundColor: '#1DA1F2',
            paddingVertical: 5,
            paddingHorizontal: 9,
            margin: 5,
          }}
          onPress={() => handleUnfollow(item.id)}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>Following</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 50,
            borderColor: '#1DA1F2',
            paddingVertical: 5,
            paddingHorizontal: 9,
            margin: 5,
          }}
          onPress={() => handleFollow(item.id)}>
          <Text style={{fontWeight: 'bold', color: '#1DA1F2'}}>Follow</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#243447',
        minHeight: 70,
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#37444D',
      }}>
      <Image
        key={item.id}
        source={{
          uri: item.avatar_url,
        }}
        style={{width: 50, height: 50, borderRadius: 50}}
      />
      <View flexDirection="column" marginLeft={10} flex={1}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
              }}>
              {item.username}
            </Text>
            <Text style={{color: '#8899A6'}}>@{item.username}</Text>
          </View>
          {user.data.id !== item.id ? handleFollowButton() : null}
        </View>
        <Text
          style={{
            color: 'white',
          }}>
          {item.bio}
        </Text>
      </View>
    </View>
  );
}

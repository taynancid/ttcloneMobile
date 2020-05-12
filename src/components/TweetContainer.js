import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import moment from 'moment';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import api from '../services/api';
import {useSelector} from 'react-redux';

export default function TweetContainer(props) {
  const {item} = props.tweet;
  const {user} = useSelector(state => state);
  const [likedByUser, setLikedByUser] = useState(false);
  const [likesCount, setLikesCount] = useState(item.likedBy.length);

  useEffect(() => {
    item.likedBy.map(likedBy => {
      if (likedBy.id === user.data.id) {
        setLikedByUser(true);
      }
    });
  }, [item, user.data.id]);

  const handleLike = async () => {
    try {
      if (likedByUser) {
        setLikedByUser(false);
        setLikesCount(likesCount - 1);
        const {data} = await api.delete(`like/${item.id}`);
      } else {
        setLikedByUser(true);
        setLikesCount(likesCount + 1);
        const {data} = await api.post(`like/${item.id}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('TweetDetailsScreen', {tweet: item})
      }
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
          uri: item.user.avatar_url,
        }}
        style={{width: 50, height: 50, borderRadius: 50}}
      />
      <View flexDirection="column" marginLeft={10}>
        <View flexDirection="row">
          <Text
            style={{
              fontWeight: 'bold',
              color: 'white',
            }}>
            {item.user.username}
          </Text>
          <Text style={{color: '#8899A6'}}>
            {' '}
            @{item.user.username} · {moment(item.created_at).fromNow()}
          </Text>
        </View>
        <Text style={{color: 'white'}}>{item.text}</Text>
        <View style={{flexDirection: 'row', paddingBottom: 10, paddingTop: 5}}>
          <View>
            <FontAwesomeIcons name="comment-o" size={15} color="#8899A6" />
          </View>
          <View
            style={{
              marginLeft: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => handleLike()}>
              {likedByUser ? (
                <FontAwesomeIcons name="heart" size={15} color="red" />
              ) : (
                <FontAwesomeIcons name="heart-o" size={15} color="#8899A6" />
              )}
            </TouchableOpacity>
            <Text style={{color: likedByUser ? 'red' : '#8899A6'}}>
              {' '}
              {likesCount}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

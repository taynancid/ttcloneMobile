import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import moment from 'moment';

// import { Container } from './styles';

export default function TweetContainer(props) {
  const {item} = props.tweet;

  useEffect(() => {
    console.log(item.user.avatar_url);
  }, [item]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#AB947E',
        minHeight: 70,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'blue',
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
            }}>
            {item.user.username}
          </Text>
          <Text>
            {' '}
            @{item.user.username} · {moment(item.created_at).fromNow()}
          </Text>
        </View>
        <Text style={{}}>{item.text}</Text>
      </View>
    </View>
  );
}

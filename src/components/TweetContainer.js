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
        backgroundColor: '#243447',
        minHeight: 70,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
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
          <Text style={{color: 'white'}}>
            {' '}
            @{item.user.username} · {moment(item.created_at).fromNow()}
          </Text>
        </View>
        <Text style={{color: 'white'}}>{item.text}</Text>
      </View>
    </View>
  );
}

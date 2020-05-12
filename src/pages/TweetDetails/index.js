import React, {useEffect, useCallback, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

import BackArrowButton from '../../components/BackArrowButton';

const TweetDetails = props => {
  const {tweet} = props.route.params;
  const [likedByUser, setLikedByUser] = useState(false);
  const [likesCount, setLikesCount] = useState(tweet.likedBy.length);

  const navigationOptions = useCallback(({navigation}) => {
    return {
      headerLeft: () => <BackArrowButton onPress={navigation.goBack} />,
      headerStyle: {
        elevation: 1, //remove shadow on Android
        borderBottomWidth: 1, //remove shadow on iOS
        borderBottomColor: '#37444D',
        shadowColor: 0,
        backgroundColor: '#243447',
      },
      headerTitle: <Text style={{color: 'white'}}>Tweet</Text>,
    };
  }, []);

  useEffect(() => {
    props.navigation.setOptions(navigationOptions(props));
  }, [props, navigationOptions]);

  return (
    <View style={{flex: 1, backgroundColor: '#243447', padding: 10}}>
      <View style={{flexDirection: 'row'}}>
        <Image
          key={tweet.id}
          source={{
            uri: tweet.user.avatar_url,
          }}
          style={{width: 50, height: 50, borderRadius: 50}}
        />
        <View flexDirection="column" marginLeft={10}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 5,
            }}>
            {tweet.user.username}
          </Text>
          <Text style={{color: '#8899A6'}}>@{tweet.user.username}</Text>
        </View>
      </View>
      <View style={{paddingTop: 10}}>
        <Text style={{color: 'white', fontSize: 20}}>{tweet.text}</Text>
        <Text style={{color: '#8899A6', fontSize: 17, marginTop: 5}}>
          {moment(tweet.created_at).format('HH:mm')} ·{' '}
          {moment(tweet.created_at).format('ll')}
        </Text>
        <View
          style={{
            borderTopWidth: 0.2,
            borderBottomWidth: 0.2,
            marginTop: 15,
            borderBottomColor: '#8899A6',
            borderTopColor: '#8899A6',
            paddingVertical: 10,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 17,
            }}>
            <Text style={{fontWeight: 'bold'}}>{tweet.likedBy.length}</Text>{' '}
            <Text style={{color: '#8899A6'}}>likes</Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 10,
            paddingTop: 5,
            marginTop: 15,
            justifyContent: 'space-around',
          }}>
          <View>
            <FontAwesomeIcons name="comment-o" size={20} color="#8899A6" />
          </View>
          <View
            style={{
              marginLeft: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => handleLike()}>
              {likedByUser ? (
                <FontAwesomeIcons name="heart" size={20} color="red" />
              ) : (
                <FontAwesomeIcons name="heart-o" size={20} color="#8899A6" />
              )}
            </TouchableOpacity>
            <Text style={{color: likedByUser ? 'red' : '#8899A6'}} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default TweetDetails;
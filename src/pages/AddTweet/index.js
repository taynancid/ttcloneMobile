import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import api from '../../services/api';
import tweetListActions from '../../store/actions/tweetList';

const AddTweet = props => {
  const user = useSelector(state => state.user);
  const [tweetText, setTweetText] = useState('');
  const [createLoading, setCreateLoading] = useState(false);
  const {tweetToReply} = props.route.params;

  const dispatch = useDispatch();

  const handleCreateTweet = async () => {
    try {
      setCreateLoading(true);
      if (tweetToReply) {
        const {data} = await api.post('reply', {
          text: tweetText,
          tweet_id: tweetToReply.id,
        });
      } else {
        const {data} = await api.post('tweets', {text: tweetText});
      }
      dispatch(tweetListActions.fetchTweets());
      props.navigation.goBack();
      setCreateLoading(false);
    } catch (e) {
      setCreateLoading(false);
      console.log(e);
    }
  };

  return (
    <View style={{backgroundColor: '#243447', flex: 1}}>
      <SafeAreaView />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 10,
        }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <FontAwesome5Icons name="times" size={25} color={'#1DA1F2'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#1DA1F2',
            borderRadius: 50,
            paddingVertical: 7,
            paddingHorizontal: 11,
          }}
          onPress={() => handleCreateTweet()}
          disabled={createLoading || tweetText === ''}>
          {createLoading ? (
            <ActivityIndicator />
          ) : (
            <Text style={{fontWeight: 'bold', color: 'white'}}>Tweet</Text>
          )}
        </TouchableOpacity>
      </View>
      {tweetToReply ? (
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 30,
            flexDirection: 'row',
          }}>
          <View style={{maxHeight: 100}}>
            <Image
              key={tweetToReply.id}
              source={{
                uri: tweetToReply.user.avatar_url,
              }}
              style={{width: 35, height: 35, borderRadius: 50}}
            />
            <View
              style={{
                left: 14.5,
                backgroundColor: '#1DA1F2',
                width: 4,
                height: '100%',
              }}
            />
          </View>
          <View flexDirection="column" marginLeft={10}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                marginBottom: 5,
              }}>
              {tweetToReply.user.username}
              <Text style={{color: '#8899A6'}}>
                {' '}
                @{tweetToReply.user.username} ·{' '}
                {moment(tweetToReply.created_at).fromNow()}
              </Text>
            </Text>

            <Text style={{color: 'white', fontSize: 20}}>
              {tweetToReply.text}
            </Text>
          </View>
        </View>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 10,
          marginVertical: 30,
        }}>
        <View>
          <Image
            style={{
              width: 35,
              height: 35,
              borderRadius: 50,
            }}
            source={{uri: user.data?.avatar_url}}
          />
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
          }}>
          <TextInput
            style={{width: '100%', color: 'white', fontSize: 20}}
            value={tweetText}
            onChangeText={setTweetText}
            multiline={true}
            autoFocus={true}
          />
        </View>
      </View>
    </View>
  );
};

export default AddTweet;

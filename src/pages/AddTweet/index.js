import React, {useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';

const AddTweet = props => {
  const user = useSelector(state => state.user);
  const [tweetText, setTweetText] = useState('');

  return (
    <View style={{backgroundColor: '#243447', flex: 1}}>
      <SafeAreaView />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <FontAwesome5Icons name="times" size={25} color={'#1DA1F2'} />
        <TouchableOpacity
          style={{
            backgroundColor: '#1DA1F2',
            borderRadius: 50,
            paddingVertical: 7,
            paddingHorizontal: 11,
          }}
          onPress={() => console.log('todo')}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>Tweet</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          paddingVertical: 30,
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
            onChange={setTweetText}
            multiline={true}
          />
        </View>
      </View>
    </View>
  );
};

export default AddTweet;

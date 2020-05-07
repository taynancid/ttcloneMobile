import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Text from '../../components/Text';
import {Container} from './styles';

import api from '../../services/api';
import {ScrollView, FlatList} from 'react-native';
import TweetContainer from '../../components/TweetContainer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import { Container } from './styles';

export default function Main(props) {
  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    loadTweets();
  }, []);

  const loadTweets = async () => {
    try {
      setLoading(true);
      const {data} = await api.get('tweets', {});

      setTweets([...data]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <>
      <Container>
        <FlatList
          data={tweets}
          renderItem={tweet => <TweetContainer tweet={tweet} />}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            zIndex: 3,
            position: 'absolute',
            bottom: 0,
            right: 0,
            borderRadius: 50,
          }}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 50,
              backgroundColor: 'rgb(29, 161, 242)',
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MaterialCommunityIcons name="feather" size={35} color="white" />
          </View>
        </TouchableOpacity>
      </Container>
    </>
  );
}

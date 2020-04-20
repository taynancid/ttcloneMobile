import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Text from '../../components/Text';
import {Container} from './styles';

import api from '../../services/api';
import {ScrollView, FlatList} from 'react-native';
import TweetContainer from '../../components/TweetContainer';

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
    <Container>
      <FlatList
        data={tweets}
        renderItem={tweet => <TweetContainer tweet={tweet} />}
        keyExtractor={item => item.id}
      />
    </Container>
  );
}

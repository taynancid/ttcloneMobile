import React, {useEffect, useState, useCallback} from 'react';
import {View, TouchableOpacity, SafeAreaView, StatusBar} from 'react-native';
import {ScrollView, FlatList} from 'react-native';

import {Container} from './styles';
import Text from '../../components/Text';
import api from '../../services/api';
import TweetContainer from '../../components/TweetContainer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import tweetListActions from '../../store/actions/tweetList';
import {useDispatch, useSelector} from 'react-redux';

export default function Main(props) {
  const {tweetList, tweetListLoading} = useSelector(state => state.tweetList);

  const dispatch = useDispatch();

  const navigationOptions = useCallback(({navigation}) => {
    return {
      headerShown: false,
    };
  }, []);

  useEffect(() => {
    props.navigation.setOptions(navigationOptions(props));
  }, [props, navigationOptions]);

  useEffect(() => {
    dispatch(tweetListActions.fetchTweets());
  }, [dispatch]);

  return (
    <>
      <Container>
        <StatusBar barStyle="light-content" />
        <SafeAreaView />
        <FlatList
          data={tweetList}
          onRefresh={() => dispatch(tweetListActions.fetchTweets())}
          refreshing={tweetListLoading}
          renderItem={tweet => <TweetContainer tweet={tweet} {...props} />}
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
          }}
          onPress={() => props.navigation.navigate('AddTweetScreen')}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 50,
              backgroundColor: '#1DA1F2',
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

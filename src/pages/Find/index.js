import React, {useCallback, useEffect, useState} from 'react';
import {View, TextInput, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import api from '../../services/api';
import {useDispatch, useSelector} from 'react-redux';
import userListActions from '../../store/actions/userList';
import UserContainer from '../../components/UserContainer';

const Find = props => {
  const [searchText, setSearchText] = useState('');
  const {userList, userListLoading} = useSelector(state => state.userList);

  const dispatch = useDispatch();

  const navigationOptions = useCallback(({navigation}) => {
    return {
      headerShown: false,
    };
  }, []);

  useEffect(() => {
    props.navigation.setOptions(navigationOptions(props));
  }, [navigationOptions, props]);

  useEffect(() => {
    dispatch(userListActions.fetchUsers());
  }, [dispatch]);

  return (
    <View style={{flex: 1, backgroundColor: '#243447'}}>
      <SafeAreaView>
        <TextInput
          style={{
            borderRadius: 50,
            backgroundColor: '#10171F',
            alignSelf: 'stretch',
            marginBottom: 15,
            fontSize: 15,
            marginHorizontal: '20%',
            marginTop: 25,
            paddingHorizontal: 10,
            paddingVertical: 5,
            color: 'white',
          }}
          value={searchText}
          onChangeText={setSearchText}
        />

        <FlatList
          data={userList}
          onRefresh={() => dispatch(userListActions.fetchUsers())}
          refreshing={userListLoading}
          renderItem={user => <UserContainer userData={user} {...props} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </View>
  );
};

export default Find;

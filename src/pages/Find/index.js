import React, {useCallback, useEffect, useState} from 'react';
import {View, TextInput, FlatList, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import api from '../../services/api';
import {useDispatch, useSelector} from 'react-redux';
import userListActions from '../../store/actions/userList';
import UserContainer from '../../components/UserContainer';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

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

  const handleSearch = () => {
    dispatch(userListActions.fetchUsers(searchText.toLowerCase()));
  };

  return (
    <View style={{flex: 1, backgroundColor: '#243447'}}>
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginBottom: 15,
            marginHorizontal: '20%',
            marginTop: 25,
          }}>
          <TextInput
            style={{
              borderRadius: 50,
              backgroundColor: '#10171F',
              alignSelf: 'stretch',
              fontSize: 15,
              paddingHorizontal: 10,
              paddingVertical: 5,
              color: 'white',
              width: '50%',
              marginRight: 10,
            }}
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity
            disabled={userListLoading}
            style={{
              backgroundColor: '#1DA1F2',
              width: 30,
              height: 30,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleSearch}>
            <FontAwesome5Icon name="search" size={15} color="white" />
          </TouchableOpacity>
        </View>

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

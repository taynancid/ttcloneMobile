import React, {useCallback, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FeatherIcons from 'react-native-vector-icons/Feather';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import UserTimelineHeader from './UserTimelineHeader';
import moment from 'moment';

export default function UserTimeline(props) {
  const user = useSelector(state => state.user);

  const navigationOptions = useCallback(({navigation}) => {
    return {
      headerShown: false,
    };
  }, []);

  useEffect(() => {
    props.navigation.setOptions(navigationOptions(props));
  }, [navigationOptions, props, user]);

  return (
    <View style={{flex: 1, backgroundColor: '#243447'}}>
      <SafeAreaView backgroundColor="#243447">
        <View style={{flex: 1, backgroundColor: '#243447'}} />
        <StatusBar backgroundColor="#1DA1F2" barStyle="light-content" />
        <UserTimelineHeader {...props} />
        <View style={{paddingTop: 5, paddingLeft: 10}}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 20}}>
            {user.data.name ? user.data.name : user.data.username}
          </Text>
          <Text style={{fontSize: 15, color: '#8899A6', marginTop: 3}}>
            @{user.data.username}
          </Text>
          <Text style={{fontSize: 15, color: '#8899A6', marginTop: 10}}>
            {user.data.bio}
          </Text>
          <View flexDirection="row" alignItems="center" marginTop={10}>
            <FeatherIcons name="map-pin" size={15} color="#8899A6" />
            <Text style={{fontSize: 15, color: '#8899A6'}}>
              {' '}
              {user.data.bio}
            </Text>
          </View>
          <View flexDirection="row" alignItems="center" marginTop={10}>
            <FontAwesomeIcons name="birthday-cake" size={15} color="#8899A6" />
            <Text style={{fontSize: 15, color: '#8899A6'}}>
              {' '}
              {moment(user.data.birthday_date).format('LL')}
            </Text>
          </View>
          <View flexDirection="row" alignItems="center" marginTop={10}>
            <FontAwesomeIcons name="calendar" size={15} color="#8899A6" />
            <Text style={{fontSize: 15, color: '#8899A6'}}>
              {' '}
              Member since {moment(user.data.created_at).format('MMMM YYYY')}
            </Text>
          </View>
          <View flexDirection="row" alignItems="center" marginTop={10}>
            <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold'}}>
              100
            </Text>
            <Text style={{fontSize: 15, color: '#8899A6', marginRight: 10}}>
              {' '}
              Following
            </Text>
            <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold'}}>
              120
            </Text>
            <Text style={{fontSize: 15, color: '#8899A6', marginRight: 10}}>
              {' '}
              Followers
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

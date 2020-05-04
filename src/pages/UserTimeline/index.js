import React, {useCallback, useEffect} from 'react';
import {View, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FeatherIcons from 'react-native-vector-icons/Feather';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import UserTimelineHeader from './UserTimelineHeader';

// import { Container } from './styles';

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
    <SafeAreaView>
      <UserTimelineHeader {...props} />
      <View style={{paddingTop: 5, paddingLeft: 10}}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>
          {user.data.username}
        </Text>
        <Text style={{fontSize: 15, color: 'gray', marginTop: 3}}>
          @{user.data.username}
        </Text>
        <Text style={{fontSize: 15, color: 'gray', marginTop: 10}}>
          {user.data.bio}
        </Text>
        <View flexDirection="row" alignItems="center" marginTop={10}>
          <FeatherIcons name="map-pin" size={15} color="gray" />
          <Text style={{fontSize: 15, color: 'gray'}}> {user.data.bio}</Text>
        </View>
        <View flexDirection="row" alignItems="center" marginTop={10}>
          <FontAwesomeIcons name="birthday-cake" size={15} color="gray" />
          <Text style={{fontSize: 15, color: 'gray'}}> {user.data.bio}</Text>
        </View>
        <View flexDirection="row" alignItems="center" marginTop={10}>
          <FontAwesomeIcons name="calendar" size={15} color="gray" />
          <Text style={{fontSize: 15, color: 'gray'}}> {user.data.bio}</Text>
        </View>
        <View flexDirection="row" alignItems="center" marginTop={10}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>100</Text>
          <Text style={{fontSize: 15, color: 'gray', marginRight: 10}}>
            {' '}
            Following
          </Text>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>120</Text>
          <Text style={{fontSize: 15, color: 'gray', marginRight: 10}}>
            {' '}
            Followers
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

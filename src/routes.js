import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {useSafeArea} from 'react-native-safe-area-context';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import Text from './components/Text';

import Main from './pages/Main';
import User from './pages/User';
import Login from './pages/Login';
import UserUpdate from './pages/UserUpdate';
import UserTimeline from './pages/UserTimeline';
import AddTweet from './pages/AddTweet';

const Routes = () => {
  const {logged} = useSelector(state => state.auth);
  const insets = useSafeArea();

  const AuthStack = createStackNavigator();
  const AuthStackComponent = () => (
    <AuthStack.Navigator>
      <AuthStack.Screen name="LoginScreen" component={Login} />
    </AuthStack.Navigator>
  );

  const MainStack = createStackNavigator();
  const MainStackComponent = () => (
    <MainStack.Navigator>
      <MainStack.Screen name="Main" component={Main} />
      {/* <MainStack.Screen name="AddTweetScreen" component={AddTweet} /> */}
    </MainStack.Navigator>
  );

  const UserProfileStack = createStackNavigator();
  const UserProfileStackComponent = () => (
    <UserProfileStack.Navigator>
      <UserProfileStack.Screen
        name="UserTimelineScreen"
        component={UserTimeline}
      />
      <UserProfileStack.Screen name="UserUpdateScreen" component={UserUpdate} />
    </UserProfileStack.Navigator>
  );

  function MainTabNavigator() {
    return (
      <Tabs.Navigator
        mode="modal"
        tabBarOptions={{
          activeTintColor: 'white',
          style: {
            backgroundColor: '#011F41',
            height: 50 + insets.bottom,
            paddingVertical: 3,
            borderTopColor: 'rgba(0,0,0,0.2)',
            shadowColor: '#000',
            shadowOffset: {
              width: 2,
              height: 5,
            },
            shadowOpacity: 0.75,
            shadowRadius: 3.84,
            elevation: 7,
          },
        }}>
        <Tabs.Screen
          name="Home"
          component={MainStackComponent}
          options={{
            tabBarLabel: ({focused}) =>
              focused ? (
                <Text fontSize={15} color="white">
                  Home
                </Text>
              ) : null,
            tabBarIcon: () => (
              <FontAwesome5Icon name="home" size={20} color="white" />
            ),
          }}
        />
        <Tabs.Screen
          name="User"
          component={UserProfileStackComponent}
          options={{
            tabBarLabel: ({focused}) =>
              focused ? (
                <Text fontSize={15} color="white">
                  User
                </Text>
              ) : null,
            tabBarIcon: () => (
              <FontAwesome5Icon name="user" size={20} color="white" />
            ),
          }}
        />
      </Tabs.Navigator>
    );
  }

  const Tabs = createBottomTabNavigator();
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      {logged ? (
        <Stack.Navigator
          mode="modal"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
          <Stack.Screen name="AddTweetScreen" component={AddTweet} />
        </Stack.Navigator>
      ) : (
        <AuthStackComponent />
      )}
    </NavigationContainer>
  );
};

export default Routes;

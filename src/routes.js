import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';
import Login from './pages/Login';

const Routes = () => {
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
      <MainStack.Screen name="User" component={User} />
    </MainStack.Navigator>
  );

  return (
    <NavigationContainer>
      <AuthStackComponent />
    </NavigationContainer>
  );
};

export default Routes;

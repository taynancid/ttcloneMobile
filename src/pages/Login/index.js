import React, {useEffect, useState, useCallback} from 'react';
import {StatusBar, Text, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {Container, Logo, Input, LoginButton} from './styles';

import api from '../../services/api';
import authActions from '../../store/actions/auth';
import userActions from '../../store/actions/user';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    checkIfHasToken();
  }, [checkIfHasToken]);

  const checkIfHasToken = useCallback(async () => {
    const token = await AsyncStorage.getItem('@ttclone:token');

    if (token) {
      try {
        setLoading(true);
        const {data} = await api.get('loggedUserInfo');
        dispatch(authActions.logIn());
        dispatch(userActions.setUser(data.user));
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    }
  }, [dispatch]);

  const handleLogIn = async () => {
    try {
      setLoading(true);
      const {data} = await api.post('login', {
        email,
        password,
      });

      await AsyncStorage.setItem('@ttclone:token', data.access_token.token);
      dispatch(authActions.logIn());
      dispatch(userActions.setUser(data.user));
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <Container>
      <StatusBar hidden />
      <Logo
        source={require('../../images/birdlogo.png')}
        resizeMode="contain"
      />
      <Input
        placeholder="Endereço de e-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      <LoginButton onPress={handleLogIn}>
        {loading ? <ActivityIndicator /> : <Text>Login</Text>}
      </LoginButton>
    </Container>
  );
}

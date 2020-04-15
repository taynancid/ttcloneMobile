import React, {useEffect, useState} from 'react';
import {StatusBar, Text} from 'react-native';
import {Container, Logo, Input, LoginButton} from './styles';

import {useSelector} from 'react-redux';

import api from '../../services/api';

export default function Login({navigation}) {
  const auth = useSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const response = await api.post('/api/v1/login', {
        email,
        password,
      });
      console.log(response.data);
    } catch (e) {
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
      <LoginButton onPress={login}>
        <Text>Login</Text>
      </LoginButton>
    </Container>
  );
}

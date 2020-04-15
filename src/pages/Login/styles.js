import React from 'react';
import {View, Image, TextInput} from 'react-native';
import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #29524a;
`;

export const Logo = styled.Image`
  height: 30%;
  margin-bottom: 40px;
`;

export const Input = styled.TextInput`
  padding-horizontal: 20px;
  padding-vertical: 15px;
  border-radius: 5px;
  background-color: #fff;
  align-self: stretch;
  margin-bottom: 15px;
  margin-horizontal: 25px;
  font-size: 16px;
`;

export const LoginButton = styled.TouchableOpacity`
  border-radius: 5px;
  background-color: #fff;
  width: 40%;
  padding-vertical: 10px;
  text-align: center;
  align-items: center;
`;

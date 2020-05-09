import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

// import { Container } from './styles';

export default function BackArrowButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={{marginLeft: 10}}>
      <FontAwesome5Icon
        name="arrow-left"
        size={20}
        color={props.color ? props.color : '#1DA1F2'}
      />
    </TouchableOpacity>
  );
}

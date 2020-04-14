import React, {useEffect} from 'react';
import {View} from 'react-native';

import {useSelector} from 'react-redux';

export default function Login() {
  const auth = useSelector(state => state.auth);

  useEffect(() => console.log(auth), [auth]);

  return <View />;
}

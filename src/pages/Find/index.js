import React, {useCallback, useEffect, useState} from 'react';
import {View, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Find = props => {
  const [searchText, setSearchText] = useState('');

  const navigationOptions = useCallback(({navigation}) => {
    return {
      headerShown: false,
    };
  }, []);

  useEffect(() => {
    props.navigation.setOptions(navigationOptions(props));
  }, [navigationOptions, props]);

  return (
    <View style={{flex: 1, backgroundColor: '#243447'}}>
      <SafeAreaView>
        <TextInput
          style={{
            borderRadius: 50,
            backgroundColor: '#10171F',
            alignSelf: 'stretch',
            marginBottom: 15,
            fontSize: 15,
            marginHorizontal: '20%',
            marginTop: 25,
            paddingHorizontal: 10,
            paddingVertical: 5,
            color: 'white',
          }}
          value={searchText}
          onChangeText={setSearchText}
        />
      </SafeAreaView>
    </View>
  );
};

export default Find;

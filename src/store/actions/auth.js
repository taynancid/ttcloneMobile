import axios from 'axios';
import {API_URL} from 'react-native-dotenv';

export const setAuth = data => ({
  type: 'SET_AUTH',
  payload: {data},
});

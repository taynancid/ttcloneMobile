import {combineReducers} from 'redux';

import auth from './auth';
import user from './user';
import tweetList from './tweetList';

export default combineReducers({
  auth,
  user,
  tweetList,
});

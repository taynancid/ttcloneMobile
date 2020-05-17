import {combineReducers} from 'redux';

import auth from './auth';
import user from './user';
import tweetList from './tweetList';
import userList from './userList';

export default combineReducers({
  auth,
  user,
  tweetList,
  userList,
});

import { combineReducers } from 'redux';

import auth from './authReducer';
import alert from './alertReducer';
import profile from './profileReducer';
import listPost from './postReducer';

export default combineReducers({
  auth,
  alert,
  profile,
  listPost,
});

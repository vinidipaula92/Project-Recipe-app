import { combineReducers } from 'redux';
import user from './user';
import dataReducer from './dataReducer';

const rootReducer = combineReducers({
  user,
  dataReducer,
});

export default rootReducer;

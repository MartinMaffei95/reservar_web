import { combineReducers } from 'redux';
import { userReducer } from '../reducers/userReducer/userReducer';
import { buildingsReducer } from '../reducers/buildingsReducer/buildingsReducer';

const rootReducer = combineReducers({
  userReducer,
  buildingsReducer,
});

export default rootReducer;

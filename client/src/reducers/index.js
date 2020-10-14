import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Reducers
import auth from './auth';

export default combineReducers({
  auth,
  form: formReducer
});
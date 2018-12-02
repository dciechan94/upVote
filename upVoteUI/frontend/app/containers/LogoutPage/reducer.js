import { fromJS } from 'immutable';

import {
  CHANGE_USERNAME,
} from './constants';

import {
  LOAD_BASEDATA,
  LOAD_BASEDATA_SUCCESS,
} from '../App/constants';

// The initial state of the App
const initialState = fromJS({
  firstNameUI: "none",
  username: '',
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:

      // Delete prefixed '@' from the github username
      return state
        .set('username', action.name.replace(/@/gi, ''));
	case LOAD_BASEDATA:
	  return state
	    .set('firstNameUI', "69");
	case LOAD_BASEDATA_SUCCESS:
      return state
        .set('firstNameUI', action.jsonData.firstName);
    default:
      return state;
  }
}

export default homeReducer;

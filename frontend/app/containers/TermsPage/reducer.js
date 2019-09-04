import produce from 'immer';
import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CLEAR_LOGIN_PAGE_DATA,
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_ERROR
} from './constants';

// The initial state of the App
export const initialState = {
  email: "",
  password: "",

  isEmailValid: true,
  isPasswordValid: true,
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {

      case CHANGE_EMAIL:
        draft.email = action.email;
        draft.isEmailValid = action.email.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?") != null;
        break;

      case CHANGE_PASSWORD:
        draft.password = action.password;
        draft.isPasswordValid = action.password.length > 0;
        break;

      case CLEAR_LOGIN_PAGE_DATA:
        draft.email = "";
        draft.password = "";
        draft.isEmailValid = true;
        draft.isPasswordValid = true;
        break;

      case POST_LOGIN_SUCCESS:
        draft.email = "";
        draft.password = "";
        break;

      case POST_LOGIN_ERROR:
        break;
    }
  });

export default loginReducer;

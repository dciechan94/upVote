/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_ERROR
} from './constants';

export const initialState = fromJS({
  email: "",
  password: "",

  isEmailValid: true,
  isPasswordValid: true,

  sysFirstName: "",
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_EMAIL:
      return state
        .set('email', action.email)
        .set('isEmailValid', action.email.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"));

    case CHANGE_PASSWORD:
      return state
        .set('password', action.password)
        .set('isPasswordValid', action.password.length > 0);

        case POST_LOGIN:
      return state;

        case POST_LOGIN_SUCCESS:
      console.log("IN LOGIN REDUCER")
      return state
        .set('sysFirstName', action.firstName);

          case POST_LOGIN_ERROR:
      return state;

    default:
      return state;
  }
}

export default loginPageReducer;

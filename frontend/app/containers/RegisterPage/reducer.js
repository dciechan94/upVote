/*
 *
 * RegisterPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_REGISTRATION_CODE,
  CHANGE_EMAIL,
  CHANGE_FIRST_NAME,
  CHANGE_LAST_NAME,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_REPEAT,
  POST_NEW_USER,
  POST_NEW_USER_SUCCESS,
  POST_NEW_USER_ERROR,
  CLOSE_REGISTRATION_RESULT_MODAL,
} from './constants';

export const initialState = fromJS({
  registrationCode: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  passwordRepeat: "",

  isRegistrationCodeValid: true,
  isEmailValid: true,
  isFirstNameValid: true,
  isLastNameValid: true,
  isPasswordValid: true,
  isPasswordRepeatValid: true,

  showRegistrationResultModal: false,
  isRegistrationResultError: true,
  registrationResultMessage: [],
});

function registerPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_REGISTRATION_CODE:
      var formatedCode = action.registrationCode.replace(/@/gi, '');
      return state
        .set('registrationCode', formatedCode)
        .set('isRegistrationCodeValid', formatedCode.length > 0);

    case CHANGE_EMAIL:
      var emailRegexp = RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
      return state
        .set('email', action.email)
        .set('isEmailValid', emailRegexp.test(action.email));

    case CHANGE_FIRST_NAME:
      return state
        .set('firstName', action.firstName)
        .set('isFirstNameValid', action.firstName.length > 0);

    case CHANGE_LAST_NAME:
      return state
        .set('lastName', action.lastName)
        .set('isLastNameValid', action.lastName.length > 0);

    case CHANGE_PASSWORD:
      return state
        .set('password', action.password)
        .set('isPasswordValid', action.password.length > 0);

    case CHANGE_PASSWORD_REPEAT:
      return state
        .set('passwordRepeat', action.passwordRepeat)
        .set('isPasswordRepeatValid', action.passwordRepeat.length > 0);

    case POST_NEW_USER:
      return state
        .set('firstNameUI', "69");
    case POST_NEW_USER_SUCCESS:
        return state
          .set('registrationCode', "")
          .set('email', "")
          .set('firstName', "")
          .set('lastName', "")
          .set('password', "")
          .set('passwordRepeat', "")
          .set('showRegistrationResultModal', true)
          .set('isRegistrationResultError', false)
          .set('registrationResultMessage', ["MESSAGE_CREATE_USER_SUCCESS"])
    case POST_NEW_USER_ERROR:
      return state
        .set('showRegistrationResultModal', true)
        .set('isRegistrationResultError', true)
        .set('registrationResultMessage', fromJS(action.jsonData.details))

    case CLOSE_REGISTRATION_RESULT_MODAL:
      return state
        .set('showRegistrationResultModal', false)
        .set('isRegistrationResultError', false)

    default:
      return state;
  }
}

export default registerPageReducer;

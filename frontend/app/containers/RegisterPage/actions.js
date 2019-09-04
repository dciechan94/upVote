import {
  CHANGE_REGISTRATION_CODE,
  CHANGE_EMAIL,
  CHANGE_FIRST_NAME,
  CHANGE_LAST_NAME,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_REPEAT,
  CHANGE_TERMS_CHECKBOX_VALUE,
  POST_NEW_USER,
  POST_NEW_USER_SUCCESS,
  POST_NEW_USER_ERROR,
  CLOSE_REGISTRATION_RESULT_MODAL,
} from './constants';

export function changeRegistrationCode(registrationCode) {
  return {
    type: CHANGE_REGISTRATION_CODE,
    registrationCode,
  };
}

export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

export function changeFirstName(firstName) {
  return {
    type: CHANGE_FIRST_NAME,
    firstName,
  };
}

export function changeLastName(lastName) {
  return {
    type: CHANGE_LAST_NAME,
    lastName,
  };
}

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

export function changePasswordRepeat(passwordRepeat) {
  return {
    type: CHANGE_PASSWORD_REPEAT,
    passwordRepeat,
  };
}

export function changeTermsCheckBoxValue() {
  return {
    type: CHANGE_TERMS_CHECKBOX_VALUE,
  };
}

export function createNewUser() {
  return {
    type: POST_NEW_USER,
  };
}

export function createNewUser_success(jsonData) {
  return {
    type: POST_NEW_USER_SUCCESS,
    jsonData,
  };
}

export function createNewUser_error(jsonData) {
  return {
    type: POST_NEW_USER_ERROR,
    jsonData,
  };
}

export function closeRegistrationResultModal() {
  return {
    type: CLOSE_REGISTRATION_RESULT_MODAL,
  };
}

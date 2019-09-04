import {
  CHANGE_EMAIL,
  CHANGE_FIRST_NAME,
  CHANGE_LAST_NAME,
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_REPEAT,
  EDIT_PROFILE,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_ERROR,
  FETCH_USER_DATA,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_ERROR,
} from './constants';

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

export function changeUsername(username) {
  return {
    type: CHANGE_USERNAME,
    username,
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

export function editProfile() {
  return {
    type: EDIT_PROFILE,
  };
}

export function editProfile_success(jsonData) {
  return {
    type: EDIT_PROFILE_SUCCESS,
    jsonData,
  };
}

export function editProfile_error(jsonData) {
  return {
    type: EDIT_PROFILE_ERROR,
    jsonData,
  };
}

export function fetchUserData() {
  return {
    type: FETCH_USER_DATA,
  };
}

export function fetchUserData_success(jsonData) {
  return {
    type: FETCH_USER_DATA_SUCCESS,
    jsonData,
  };
}

export function fetchUserData_error(jsonData) {
  return {
    type: FETCH_USER_DATA_ERROR,
    jsonData,
  };
}

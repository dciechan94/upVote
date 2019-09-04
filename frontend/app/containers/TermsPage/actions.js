import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CLEAR_LOGIN_PAGE_DATA,
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_ERROR
} from './constants';

export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

export function clearLoginPageData() {
  return {
    type: CLEAR_LOGIN_PAGE_DATA,
  };
}

export function postLogin() {
  return {
    type: POST_LOGIN,
  };
}

export function postLogin_success(jsonData) {
  return {
    type: POST_LOGIN_SUCCESS,
    jsonData,
  };
}

export function postLogin_error(jsonData) {
  return {
    type: POST_LOGIN_ERROR,
    jsonData,
  };
}

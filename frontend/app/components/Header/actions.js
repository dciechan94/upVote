import {
  POST_LOGOUT,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_ERROR
} from './constants';


export function postLogout() {
  return {
    type: POST_LOGOUT,
  };
}

export function postLogout_success(jsonData) {
  return {
    type: POST_LOGOUT_SUCCESS,
    jsonData,
  };
}

export function postLogout_error(jsonData) {
  return {
    type: POST_LOGOUT_ERROR,
    jsonData,
  };
}

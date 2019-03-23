import {
  CHANGE_TOKENS_COUNT,
  CHANGE_TOKENS_VALID_TIMEOUT,
  CHANGE_TOKENS_SELECTION,
  GENERATE_TOKENS,
  GENERATE_TOKENS_SUCCESS,
  GENERATE_TOKENS_ERROR,
  GET_ACTIVE_TOKENS,
  GET_ACTIVE_TOKENS_SUCCESS,
  GET_ACTIVE_TOKENS_ERROR,
  DELETE_TOKENS,
  DELETE_TOKENS_SUCCESS,
  DELETE_TOKENS_ERROR
} from './constants';


export function changeTokensCount(count) {
  return {
    type: CHANGE_TOKENS_COUNT,
    count,
  };
}

export function changeTokensValidTimeout(timeoutInDays) {
  return {
    type: CHANGE_TOKENS_VALID_TIMEOUT,
    timeoutInDays,
  };
}

export function changeCodesSelection(codeId) {
  return {
    type: CHANGE_TOKENS_SELECTION,
    codeId,
  };
}

export function generateTokens() {
  return {
    type: GENERATE_TOKENS,
  };
}

export function generateTokens_success(jsonData) {
  return {
    type: GENERATE_TOKENS_SUCCESS,
    jsonData,
  };
}

export function generateTokens_error(jsonData) {
  return {
    type: GENERATE_TOKENS_ERROR,
    jsonData,
  };
}

export function getActiveTokens() {
  return {
    type: GET_ACTIVE_TOKENS,
  };
}

export function getActiveTokens_success(jsonData) {
  return {
    type: GET_ACTIVE_TOKENS_SUCCESS,
    jsonData,
  };
}

export function getActiveTokens_error(jsonData) {
  return {
    type: GET_ACTIVE_TOKENS_ERROR,
    jsonData,
  };
}

export function deleteTokens() {
  return {
    type: DELETE_TOKENS,
  };
}

export function deleteTokens_success(jsonData) {
  return {
    type: DELETE_TOKENS_SUCCESS,
    jsonData,
  };
}

export function deleteTokens_error(jsonData) {
  return {
    type: DELETE_TOKENS_ERROR,
    jsonData,
  };
}

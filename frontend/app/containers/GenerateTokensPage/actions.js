import {
  CHANGE_TOKEN_COUNT,
  CHANGE_TOKEN_VALID_IN_DAYS,

  GENERATE_TOKENS,
  GENERATE_TOKENS_SUCCESS,
  GENERATE_TOKENS_ERROR,

  FETCH_ACTUAL_TOKENS,
  FETCH_ACTUAL_TOKENS_SUCCESS,
  FETCH_ACTUAL_TOKENS_ERROR,
} from './constants';



export function changeTokenCount(tokenCount) {
  return {
    type: CHANGE_TOKEN_COUNT,
    tokenCount,
  };
}
export function changeTokenValidInDays(tokenValidInDays) {
  return {
    type: CHANGE_TOKEN_VALID_IN_DAYS,
    tokenValidInDays,
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
    jsonData
  };
}
export function generateTokens_error(jsonData) {
  return {
    type: GENERATE_TOKENS_ERROR,
    jsonData
  };
}


export function fetchActualTokens() {
  return {
    type: FETCH_ACTUAL_TOKENS,
  };
}
export function fetchActualTokens_success(jsonData) {
  return {
    type: FETCH_ACTUAL_TOKENS_SUCCESS,
    jsonData,
  };
}
export function fetchActualTokens_error(jsonData) {
  return {
    type: FETCH_ACTUAL_TOKENS_ERROR,
    jsonData,
  };
}

import produce from 'immer';
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


export const initialState = {
  tokenCount: 0,
  tokenValidInDays: 0,
  actualTokens: [],
  newTokens: [],
};

const generateTokensReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {

      case CHANGE_TOKEN_COUNT:
        draft.tokenCount = parseInt(action.tokenCount)
        break;

      case CHANGE_TOKEN_VALID_IN_DAYS:
        draft.tokenValidInDays = parseInt(action.tokenValidInDays)
        break;

      case GENERATE_TOKENS:
        break;

      case GENERATE_TOKENS_SUCCESS:
        draft.newTokens  = action.jsonData
        break;

      case GENERATE_TOKENS_ERROR:
        break;

      case FETCH_ACTUAL_TOKENS:
        break;

      case FETCH_ACTUAL_TOKENS_SUCCESS:
        console.log(action.jsonData.map(item => item.id).join(', '))
        draft.actualTokens = action.jsonData
        break;

      case FETCH_ACTUAL_TOKENS_ERROR:
        break;
    }
  });

export default generateTokensReducer;

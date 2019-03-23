import { fromJS } from 'immutable';
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

export const initialState = fromJS({
  count: 1,
  timeout: 7,

  isCountValid: true,
  isTimeoutValid: true,

  codes: [ { id: 10, validUntil: 1549800351711, code: "startupDate"}, { id: 11, validUntil: 1549800351711, code: "startupDate"} ],
  codesSelection: [ 11 ]
});

function generateTokensPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TOKENS_COUNT:
      return state;

    case CHANGE_TOKENS_VALID_TIMEOUT:
      return state;

    case CHANGE_TOKENS_SELECTION:
      var codeId = action.codeId;
      var modified = state.get('codesSelection').toArray();

      if (state.get('codesSelection').contains(codeId)) {
        var position = modified.indexOf(codeId);
        if ( ~position ) modified.splice(position, 1);
      } else {
        modified.push(codeId)
      }
      return state.set('codesSelection', fromJS(modified))

    case GENERATE_TOKENS:
      return state;

    case GENERATE_TOKENS_SUCCESS:
      return state;

    case GENERATE_TOKENS_ERROR:
      return state
        .set('errorDetails', fromJS(action.jsonData.details));

    case GET_ACTIVE_TOKENS:
      return state;

    case GET_ACTIVE_TOKENS_SUCCESS:
      return state
        .set('codesSelection', fromJS([]))
        .set('codes', fromJS(action.jsonData));

    case GET_ACTIVE_TOKENS_ERROR:
      return state
        .set('errorDetails', fromJS(action.jsonData.details));

    case DELETE_TOKENS:
      return state;

    case DELETE_TOKENS_SUCCESS:
      return state;

    case DELETE_TOKENS_ERROR:
      return state
        .set('errorDetails', fromJS(action.jsonData.details));

    default:
      return state;
  }
}

export default generateTokensPageReducer;

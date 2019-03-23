import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import request from 'utils/request';

import { SERVER_REST_URL } from '../App/constants';
import { 
  GENERATE_TOKENS,
  GET_ACTIVE_TOKENS,
  DELETE_TOKENS,
 } from './constants';
 import { 
  generateTokens_success, 
  generateTokens_error,
  getActiveTokens_success,
  getActiveTokens_error,
  deleteTokens_success,
  deleteTokens_error
} from './actions';
import { fatalErrorOccured } from "../App/actions";
import { 
  makeSelectTokensCount, 
  makeSelectTokensTimeout,
  makeSelectCodesSelection
} from './selectors';
import { 
  makeSelectCurrentUser
} from '../App/selectors';





export function* generateTokensSaga() {
  const user = yield select(makeSelectCurrentUser())
  const username = user.get('email')
  const password = user.get('password')
  const authToken = new Buffer(username+':'+password).toString('base64');

  const tokensCount = yield select(makeSelectTokensCount());
  const tokensTimeout = yield select(makeSelectTokensTimeout())

  const requestURL = SERVER_REST_URL + `codes`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + authToken
    },
    body: JSON.stringify({
      type: 'registration',
      count: tokensCount,
      timeout: tokensTimeout
    })
  }

  try {
    const jsonData = yield call(request, requestURL, requestOptions);
    yield put(generateTokens_success(jsonData));
  }
  catch(e) {
    console.log("error")
    yield put(fatalErrorOccured("Cannot fetch generate tokens"));
    //yield put(generateTokens_error(jsonData.data));
  }
}

export function* getActiveTokensSaga() {
  const user = yield select(makeSelectCurrentUser())
  const username = user.get('email')
  const password = user.get('password')
  const authToken = new Buffer(username+':'+password).toString('base64');

  const requestURL = SERVER_REST_URL + `codes`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + authToken
    }
  }

  try {
    const jsonData = yield call(request, requestURL, requestOptions);
    yield put(getActiveTokens_success(jsonData));
  }
  catch(e) {
    console.log("error")
    yield put(fatalErrorOccured("Cannot fetch active tokens"));
    //yield put(getActiveTokens_error(jsonData.data));
  }

}

export function* deleteTokensSaga() {
  const user = yield select(makeSelectCurrentUser())
  const username = user.get('email')
  const password = user.get('password')
  const authToken = new Buffer(username+':'+password).toString('base64');

  const tokenIds = yield select(makeSelectCodesSelection());

  const requestURL = SERVER_REST_URL + `codes`;
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + authToken
    },
    body: JSON.stringify({
      ids: tokenIds
    })
  }


  try {
    const jsonData = yield call(request, requestURL, requestOptions);
    yield put(deleteTokens_success(jsonData));
  }
  catch(e) {
    console.log("error")
    yield put(fatalErrorOccured("Cannot fetch delete tokens"));
    //yield put(deleteTokens_error(jsonData.data));
  }
}



export function* generateTokensSagaYield() {
  yield takeLatest(GENERATE_TOKENS, generateTokensSaga)
}
export function* getActiveTokensSagaYield() {
    yield takeLatest(GET_ACTIVE_TOKENS, getActiveTokensSaga)
}
export function* deleteTokensSagaYield() {
  yield takeLatest(DELETE_TOKENS, deleteTokensSaga)
}

export default function* rootSaga() {
  yield all([
    generateTokensSagaYield(),
    getActiveTokensSagaYield(),
    deleteTokensSagaYield()
  ])
}
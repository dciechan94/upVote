import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { POST_LOGIN } from './constants';
import { SERVER_REST_URL } from '../App/constants';
import { postLogin_success, postLogin_error } from './actions';
import { makeSelectEmail, makeSelectPassword } from './selectors';


export function* tryAuthenticate() {
  const username = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());

  const authToken = new Buffer(username+':'+password).toString('base64');

  const requestURL = SERVER_REST_URL + `users/login/`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + authToken
    },
    body: JSON.stringify({})
  }

  const jsonData = yield call(request, requestURL, requestOptions);
  if(jsonData.status >= 200 && jsonData.status <= 299) {
    yield put(postLogin_success(jsonData));
  } else {
    yield put(postLogin_error(jsonData));
  }
}

export default function* postLogin() {
  yield takeLatest(POST_LOGIN, tryAuthenticate);
}

import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router/immutable';

import { POST_LOGIN } from './constants';
import { SERVER_REST_URL } from '../App/constants';
import { postLogin_success, postLogin_error } from './actions';
import { makeSelectEmail, makeSelectPassword } from './selectors';


export function* tryAuthenticate() {
  const username = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());

  const authToken = new Buffer(username+':'+password).toString('base64');

  const requestURL = SERVER_REST_URL + `login/`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + authToken,
    }
  }

  try {
    const jsonData = yield call(request, requestURL, requestOptions);
    yield put(postLogin_success(jsonData));
    yield put(push("/elections/browse/actual"));

  } catch (error) {
    //console.log(error)
    //console.log(error.code)
    //console.log(error.message)
    yield put(postLogin_error(error));
  }
}

export default function* postLogin() {
  yield takeLatest(POST_LOGIN, tryAuthenticate);
}



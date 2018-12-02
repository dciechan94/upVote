/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import { POST_NEW_USER } from './constants';
//import { reposLoaded, repoLoadingError, loadedBaseData } from 'containers/App/actions';
import { createNewUser_success, createNewUser_error } from './actions';

import request from 'utils/request';
//import { makeSelectUsername } from 'containers/HomePage/selectors';
import { makeSelectRegistrationCode, makeSelectEmail, makeSelectFirstName, makeSelectLastName, makeSelectPassword,
  makeSelectPasswordRepeat } from './selectors'


export function* postUser() {
  const registrationCodeVal = yield select(makeSelectRegistrationCode());
  const emailVal = yield select(makeSelectEmail())
  const firstNameVal = yield select(makeSelectFirstName())
  const lastNameVal = yield select(makeSelectLastName())
  const passwordVal = yield select(makeSelectPassword())

  const requestURL = `http://localhost:8082/users/`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      registrationCode: registrationCodeVal,
      username: emailVal,
      email: emailVal,
      firstName: firstNameVal,
      lastName: lastNameVal,
      passwordHash: passwordVal
    })
  }


  const jsonData = yield call(request, requestURL, requestOptions);
  if(jsonData.status >= 200 && jsonData.status <= 299) {
    yield put(createNewUser_success(jsonData.data));
  } else {
    yield put(createNewUser_error(jsonData.data));
  }
}


export function* registerUser() {
  yield takeLatest(POST_NEW_USER, postUser)
}

export default function* rootSaga() {
  yield all([
    registerUser()
  ])
}


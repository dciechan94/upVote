import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import request from 'utils/request';

import { POST_NEW_USER } from './constants';
import { SERVER_REST_URL } from '../App/constants';
import { createNewUser_success, createNewUser_error } from './actions';
import { makeSelectRegistrationCode, makeSelectEmail, makeSelectFirstName, makeSelectLastName, makeSelectPassword } from './selectors'

export function* postUser() {
  const registrationCodeVal = yield select(makeSelectRegistrationCode());
  const emailVal = yield select(makeSelectEmail())
  const firstNameVal = yield select(makeSelectFirstName())
  const lastNameVal = yield select(makeSelectLastName())
  const passwordVal = yield select(makeSelectPassword())



  const requestURL = SERVER_REST_URL + `users?code=` + registrationCodeVal;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: firstNameVal,
      lastName: lastNameVal,
      email: emailVal,
      passwordHash: passwordVal
    })
  }

  try {
    const jsonData = yield call(request, requestURL, requestOptions);
    console.log(jsonData)
    yield put(createNewUser_success(jsonData));

  } catch (error) {
    console.log(requestURL + " --> "+ error.code + ": " + error.message)
    yield put(createNewUser_error(error));
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

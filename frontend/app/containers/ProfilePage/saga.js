import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import request from 'utils/request';

import { Intent } from "@blueprintjs/core";

import { openGlobalDialog } from '../App/actions';
import { SERVER_REST_URL } from '../App/constants';
import { makeSelectToken, makeSelectUserId } from '../App/selectors';

import {
  EDIT_PROFILE,
  FETCH_USER_DATA, } from './constants';
import {
  fetchUserData_success,
  editProfile_success } from './actions';
import {
  makeSelectUsername,
  makeSelectEmail,
  makeSelectFirstName,
  makeSelectLastName,
  makeSelectPassword } from './selectors';

export function* tryFetchUserData() {
  const token = yield select(makeSelectToken());

  const userId = yield select(makeSelectUserId())

  const requestURL = SERVER_REST_URL + `users/` + userId + `/`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + token,
    }
  }

  try {
    const jsonData = yield call(request, requestURL, requestOptions);
    yield put(fetchUserData_success(jsonData));
  } catch (error) {

    var config = {
      icon: "user",
      intent: Intent.DANGER,
      title: "Cannot fetch user data",
      message: error.message,
      buttonText: "OK",
    }

    yield put(openGlobalDialog(config));
  }
}

export function* tryEditProfile() {
  const token = yield select(makeSelectToken());

  const emailVal = yield select(makeSelectEmail())
  const firstNameVal = yield select(makeSelectFirstName())
  const lastNameVal = yield select(makeSelectLastName())
  const usernameVal = yield select(makeSelectUsername())
  const passwordVal = yield select(makeSelectPassword())

  const userId = yield select(makeSelectUserId())

  const requestURL = SERVER_REST_URL + `users/` + userId + `/`;
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + token,
    },
    body: JSON.stringify({
      firstName: firstNameVal,
      lastName: lastNameVal,
      email: emailVal,
      passwordHash: passwordVal,
      login: usernameVal,
    })
  }

  try {
    const jsonData = yield call(request, requestURL, requestOptions);

    var config = {
      icon: "user",
      intent: Intent.SUCCESS,
      title: "Success",
      message: "User data saved",
      buttonText: "OK",
    }

    yield put(openGlobalDialog(config));
    yield put(editProfile_success(jsonData));
  } catch (error) {

    var config = {
      icon: "user",
      intent: Intent.DANGER,
      title: "Cannot edit user data",
      message: error.message,
      buttonText: "OK",
    }

    yield put(openGlobalDialog(config));
  }
}

export function* fetchUserData() {
  yield takeLatest(FETCH_USER_DATA, tryFetchUserData)
}

export function* editProfile() {
  yield takeLatest(EDIT_PROFILE, tryEditProfile)
}

export default function* rootSaga() {
  yield all([
    fetchUserData(),
    editProfile(),
  ])
}


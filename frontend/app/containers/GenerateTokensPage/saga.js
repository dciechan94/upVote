import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import request from 'utils/request';

import { Intent } from "@blueprintjs/core";

import {
  GENERATE_TOKENS,
  FETCH_ACTUAL_TOKENS } from './constants';

import { openGlobalDialog } from '../App/actions';
import { SERVER_REST_URL } from '../App/constants';
import { makeSelectToken } from '../App/selectors';

import { fetchActualTokens_success, generateTokens_success, fetchActualTokens } from './actions';
import { makeSelectTokenCount,
  makeSelectTokenValidInDays } from './selectors'

export function* tryFetchActualTokens() {
  const token = yield select(makeSelectToken());

  const requestURL = SERVER_REST_URL + `codes/`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + token,
    }
  }

  try {
    const jsonData = yield call(request, requestURL, requestOptions);
    yield put(fetchActualTokens_success(jsonData));
  } catch (error) {

    var config = {
      icon: "user",
      intent: Intent.DANGER,
      title: "Cannot fetch tokens",
      message: error.message,
      buttonText: "OK",
    }

    yield put(openGlobalDialog(config));
  }
}

export function* tryGenerateTokens() {
  const token = yield select(makeSelectToken());
  const tokenCount = yield select(makeSelectTokenCount());
  const tokenValidInDays = yield select(makeSelectTokenValidInDays());

  const requestURL = SERVER_REST_URL + `codes/`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + token,
    },
    body: JSON.stringify({
      count: tokenCount,
      timeout: tokenValidInDays,
    })
  }

  try {
    const jsonData = yield call(request, requestURL, requestOptions);

    var config = {
      icon: "user",
      intent: Intent.SUCCESS,
      title: "Success",
      message: "Tokens created",
      buttonText: "OK",
    }

    yield put(openGlobalDialog(config));
    yield put(fetchActualTokens(config));
    yield put(generateTokens_success(jsonData));
  } catch (error) {

    var config = {
      icon: "user",
      intent: Intent.DANGER,
      title: "Cannot create tokens",
      message: error.message,
      buttonText: "OK",
    }

    yield put(openGlobalDialog(config));
  }
}

export function* generateTokensSaga() {
  yield takeLatest(GENERATE_TOKENS, tryGenerateTokens)
}

export function* fetchActualTokensSaga() {
  yield takeLatest(FETCH_ACTUAL_TOKENS, tryFetchActualTokens)
}

export default function* rootSaga() {
  yield all([
    generateTokensSaga(),
    fetchActualTokensSaga(),
  ])
}

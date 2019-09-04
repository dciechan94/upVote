import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router/immutable';

import { Intent } from "@blueprintjs/core";

import {
  CREATE_NEW_POLL,
  FETCH_ALL_USERS,
  FETCH_POLL_DETAILS,
  UPDATE_EXISTING_POLL,
  DELETE_POLL,
 } from './constants';
import { SERVER_REST_URL } from '../App/constants';
import {
  createNewPoll_success,
  createNewPoll_error,
  fetchAllUsers_success,
  fetchAllUsers_error,
  updateExistingPoll_success,
  updateExistingPoll_error,
  fetchPollDetails_success,
  fetchPollDetails_error,
  deletePoll_success } from './actions';
import { makeSelectName, makeSelectDescription, makeSelectStartDate, makeSelectEndDate,
  makeSelectPublishDate, makeSelectSelectedUsers, makeSelectEditablePollId } from './selectors';
  import { makeSelectToken } from 'containers/App/selectors';


import { openGlobalDialog } from 'containers/App/actions';


export function* trySavePoll() {
  const token = yield select(makeSelectToken());

  const name = yield select(makeSelectName());
  const description = yield select(makeSelectDescription());
  const startDate = yield select(makeSelectStartDate());
  const startDateLong = startDate.getTime()
  const endDate = yield select(makeSelectEndDate());
  const endDateLong = endDate.getTime()
  const publishedDate = yield select(makeSelectPublishDate());
  const publishedDateLong = publishedDate.getTime()
  const candidates = yield select(makeSelectSelectedUsers());

  var x = JSON.stringify({
    name: name,
    description: description,
    startDate: startDateLong,
    endDate: endDateLong,
    publishDate: publishedDateLong,
    candidates: candidates
  });
  console.log(x)

  const requestURL = SERVER_REST_URL + `polls/`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + token,
    },
    body: JSON.stringify({
      name: name,
      description: description,
      startDate: startDateLong,
      endDate: endDateLong,
      publishDate: publishedDateLong,
      candidates: candidates
    })
  }

  try {
    const jsonData = yield call(request, requestURL, requestOptions);
    yield put(createNewPoll_success(jsonData));
    yield put(push("/elections/browse/actual"));

  } catch (error) {

    var config = {
      icon: "user",
      intent: Intent.DANGER,
      title: "Cannot save voting poll",
      message: error.message,
      buttonText: "OK",
    }

    yield put(openGlobalDialog(config));
  }
}

export function* tryUpdatePoll() {
  const token = yield select(makeSelectToken());

  const pollId = yield select(makeSelectEditablePollId());

  const name = yield select(makeSelectName());
  const description = yield select(makeSelectDescription());
  const startDate = yield select(makeSelectStartDate());
  const startDateLong = startDate.getTime()
  const endDate = yield select(makeSelectEndDate());
  const endDateLong = endDate.getTime()
  const publishedDate = yield select(makeSelectPublishDate());
  const publishedDateLong = publishedDate.getTime()
  const candidates = yield select(makeSelectSelectedUsers());

  var x = JSON.stringify({
    name: name,
    description: description,
    startDate: startDateLong,
    endDate: endDateLong,
    publishDate: publishedDateLong,
    candidates: candidates
  });
  console.log(x)

  const requestURL = SERVER_REST_URL + `polls/` + pollId + `/`;
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + token,
    },
    body: JSON.stringify({
      name: name,
      description: description,
      startDate: startDateLong,
      endDate: endDateLong,
      publishDate: publishedDateLong,
      candidates: candidates
    })
  }

  try {
    const jsonData = yield call(request, requestURL, requestOptions);
    yield put(updateExistingPoll_success(jsonData));
    yield put(push("/elections/browse/actual"));

  } catch (error) {

    var config = {
      icon: "user",
      intent: Intent.DANGER,
      title: "Cannot update voting poll",
      message: error.message,
      buttonText: "OK",
    }

    yield put(openGlobalDialog(config));
  }
}

export function* tryFetchAllUsers() {
  const token = yield select(makeSelectToken());
  const requestURL = SERVER_REST_URL + `users/`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + token,
    }
  }

  try {
    const jsonData = yield call(request, requestURL, requestOptions);
    yield put(fetchAllUsers_success(jsonData));
  } catch (error) {

    var config = {
      icon: "user",
      intent: Intent.DANGER,
      title: "Cannot fetch users",
      message: error.message,
      buttonText: "OK",
    }

    yield put(openGlobalDialog(config));
  }
}

export function* tryFetchPollDetails() {
  const token = yield select(makeSelectToken());
  const pollId = yield select(makeSelectEditablePollId());

  const requestURL = SERVER_REST_URL + `polls/` + pollId;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + token,
    }
  }

  try {
    const jsonData = yield call(request, requestURL, requestOptions);
    yield put(fetchPollDetails_success(jsonData));
  } catch (error) {

    var config = {
      icon: "user",
      intent: Intent.DANGER,
      title: "Cannot fetch poll details",
      message: error.message,
      buttonText: "OK",
    }

    yield put(openGlobalDialog(config));
  }
}

export function* tryDeletePoll() {
  const token = yield select(makeSelectToken());
  const pollId = yield select(makeSelectEditablePollId());

  const requestURL = SERVER_REST_URL + `polls/` + pollId;
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + token,
    }
  }

  try {
    const jsonData = yield call(request, requestURL, requestOptions);
    yield put(deletePoll_success(jsonData));
    yield put(push("/elections/browse/actual"));
  } catch (error) {

    var config = {
      icon: "user",
      intent: Intent.DANGER,
      title: "Cannot fetch poll details",
      message: error.message,
      buttonText: "OK",
    }

    yield put(openGlobalDialog(config));
  }
}


export function* fetchAllUsers() {
  yield takeLatest(FETCH_ALL_USERS, tryFetchAllUsers)
}

export function* savePoll() {
  yield takeLatest(CREATE_NEW_POLL, trySavePoll)
}

export function* fetchPollDetails() {
  yield takeLatest(FETCH_POLL_DETAILS, tryFetchPollDetails)
}

export function* updatePoll() {
  yield takeLatest(UPDATE_EXISTING_POLL, tryUpdatePoll)
}

export function* deletePoll() {
  yield takeLatest(DELETE_POLL, tryDeletePoll)
}



export default function* rootSaga() {
  yield all([
    fetchAllUsers(),
    savePoll(),
    fetchPollDetails(),
    updatePoll(),
    deletePoll(),
  ])
}


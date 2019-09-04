import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import request from 'utils/request';

import { Intent } from "@blueprintjs/core";

import { openGlobalDialog } from '../App/actions';
import { SERVER_REST_URL } from '../App/constants';
import { makeSelectToken } from '../App/selectors';

import { FETCH_ALL_POLLS, SEND_VOTES } from './constants';
import { fetchAllPolls_success, sendVotes_success } from './actions';
import { makeSelectPollInDialog, makeSelectSelectedCandidates } from './selectors';



export function* tryFetchAllPolls() {
  const token = yield select(makeSelectToken());
  const requestURL = SERVER_REST_URL + `polls/`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + token,
    }
  }

  try {
    const jsonData = yield call(request, requestURL, requestOptions);
    yield put(fetchAllPolls_success(jsonData));
  } catch (error) {

    var config = {
      icon: "user",
      intent: Intent.DANGER,
      title: "Cannot fetch polls",
      message: error.message,
      buttonText: "OK",
    }

    yield put(openGlobalDialog(config));
  }
}

export function* trySendVotes() {
  const token = yield select(makeSelectToken());
  const pollInDialog = yield select(makeSelectPollInDialog());
  const selectedCandidates = yield select(makeSelectSelectedCandidates());

  const requestURL = SERVER_REST_URL + `polls/` + pollInDialog.id + `/votes/`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + token,
    },
    body: JSON.stringify({
      parentPollId: pollInDialog.id,
      voteTargetId: selectedCandidates[0],
    })
  }

  try {
    const jsonData = yield call(request, requestURL, requestOptions);

    var config = {
      icon: "user",
      intent: Intent.SUCCESS,
      title: "Voting completed",
      message: "Vote was accepted",
      buttonText: "OK",
    }

    yield put(openGlobalDialog(config));

    yield put(sendVotes_success(jsonData));
  } catch (error) {

    var config = {
      icon: "user",
      intent: Intent.DANGER,
      title: "Cannot send votes",
      message: error.message,
      buttonText: "OK",
    }

    yield put(openGlobalDialog(config));
  }
}

export function* fetchAllPolls() {
  yield takeLatest(FETCH_ALL_POLLS, tryFetchAllPolls)
}

export function* sendVotes() {
  yield takeLatest(SEND_VOTES, trySendVotes)
}

export default function* rootSaga() {
  yield all([
    fetchAllPolls(),
    sendVotes(),
  ])
}


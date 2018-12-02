import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { makeSelectOrganizationId } from './selectors';
import { LOAD_BASE_DATA, LOAD_DETAIL_DATA } from './constants';
import { loadedBaseData, loadingBaseDataError, loadedDetailData, loadingDetailDataError } from './actions';
import { SERVER_REST_URL } from '../App/constants';


export function* fetchBaseOrganizationData() {
  const organizationId = yield select(makeSelectOrganizationId());
  const requestURL = SERVER_REST_URL + `organizations/${organizationId}/`;

  try {
    const jsonData = yield call(request, requestURL);
    yield put(loadedBaseData(jsonData));
  } catch (err) {
    yield put(loadingBaseDataError(err));
  }
}

export function* fetchDetailOrganizationData() {
  const organizationId = yield select(makeSelectOrganizationId());
  const requestURL = SERVER_REST_URL + `organizations/${organizationId}?_expand=true`;

  try {
    const jsonData = yield call(request, requestURL);
    yield put(loadedDetailData(jsonData));
  } catch (err) {
    yield put(loadingDetailDataError(err));
  }
}


export default function* sagaBaseOrganizationData() {
  yield takeLatest(LOAD_BASE_DATA, fetchBaseOrganizationData)
  yield takeLatest(LOAD_DETAIL_DATA, fetchDetailOrganizationData)
}
/*
export default function* rootSaga() {
  yield all([
    registerUser()
  ])
*/
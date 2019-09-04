import {
  CHANGE_NAME,
  CHANGE_DESCRIPTION,
  CHANGE_START_DATE,
  CHANGE_END_DATE,
  CHANGE_START_END_DATE,
  CHANGE_PUBLISH_DATE,
  CHANGE_USER_QUERY_STRING,
  ADD_SELECTED_USER,
  REMOVE_SELECTED_USER,
  CREATE_NEW_POLL,
  CREATE_NEW_POLL_SUCCESS,
  CREATE_NEW_POLL_ERROR,
  FETCH_ALL_USERS,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_ERROR,
  FETCH_POLL_DETAILS,
  FETCH_POLL_DETAILS_SUCCESS,
  FETCH_POLL_DETAILS_ERROR,
  UPDATE_EXISTING_POLL,
  UPDATE_EXISTING_POLL_SUCCESS,
  UPDATE_EXISTING_POLL_ERROR,
  DELETE_POLL,
  DELETE_POLL_SUCCESS,
  DELETE_POLL_ERROR,
} from './constants';


export function changeName(name) {
  return {
    type: CHANGE_NAME,
    name,
  };
}

export function changeDescription(description) {
  return {
    type: CHANGE_DESCRIPTION,
    description,
  };
}

export function changeStartDate(startDate) {
  return {
    type: CHANGE_START_DATE,
    startDate,
  };
}

export function changeEndDate(endDate) {
  return {
    type: CHANGE_END_DATE,
    endDate,
  };
}
export function changeStartEndDate(startEndDate) {
  return {
    type: CHANGE_START_END_DATE,
    startEndDate,
  };
}
export function changePublishDate(publishDate) {
  return {
    type: CHANGE_PUBLISH_DATE,
    publishDate,
  };
}
export function changeUserQueryString(userQueryString) {
  return {
    type: CHANGE_USER_QUERY_STRING,
    userQueryString,
  };
}
export function addSelectedUser(nextUsers, nextSelectedUsers, nextCreatedUsers) {
  return {
    type: ADD_SELECTED_USER,
    nextUsers,
    nextSelectedUsers,
    nextCreatedUsers,
  };
}
export function removeSelectedUser(nextUsers, nextSelectedUsers, nextCreatedUsers) {
  return {
    type: REMOVE_SELECTED_USER,
    nextUsers,
    nextSelectedUsers,
    nextCreatedUsers,
  };
}

export function createNewPoll() {
  return {
    type: CREATE_NEW_POLL,
  };
}
export function createNewPoll_success(jsonData) {
  return {
    type: CREATE_NEW_POLL_SUCCESS,
    jsonData,
  };
}
export function createNewPoll_error(jsonData) {
  return {
    type: CREATE_NEW_POLL_ERROR,
    jsonData,
  };
}

export function fetchAllUsers() {
  return {
    type: FETCH_ALL_USERS,
  };
}
export function fetchAllUsers_success(jsonData) {
  return {
    type: FETCH_ALL_USERS_SUCCESS,
    jsonData,
  };
}
export function fetchAllUsers_error(jsonData) {
  return {
    type: FETCH_ALL_USERS_ERROR,
    jsonData,
  };
}

export function fetchPollDetails(pollId) {
  return {
    type: FETCH_POLL_DETAILS,
    pollId,
  };
}
export function fetchPollDetails_success(jsonData) {
  return {
    type: FETCH_POLL_DETAILS_SUCCESS,
    jsonData,
  };
}
export function fetchPollDetails_error(jsonData) {
  return {
    type: FETCH_POLL_DETAILS_ERROR,
    jsonData,
  };
}

export function updateExistingPoll() {
  return {
    type: UPDATE_EXISTING_POLL,
  };
}
export function updateExistingPoll_success(jsonData) {
  return {
    type: UPDATE_EXISTING_POLL_SUCCESS,
    jsonData,
  };
}
export function updateExistingPoll_error(jsonData) {
  return {
    type: UPDATE_EXISTING_POLL_ERROR,
    jsonData,
  };
}

export function deletePoll() {
  return {
    type: DELETE_POLL,
  };
}
export function deletePoll_success(jsonData) {
  return {
    type: DELETE_POLL_SUCCESS,
    jsonData,
  };
}
export function deletePoll_error(jsonData) {
  return {
    type: DELETE_POLL_ERROR,
    jsonData,
  };
}

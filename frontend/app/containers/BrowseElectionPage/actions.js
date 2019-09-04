import {
  CHANGE_POLL_QUERY_STRING,
  FETCH_ALL_POLLS,
  FETCH_ALL_POLLS_SUCCESS,
  FETCH_ALL_POLLS_ERROR,

  SELECT_POLL_ROW,
  CHANGE_CHB_CANDIDATE_SELECTION,
  CLOSE_POLL_DETAILS,
  SEND_VOTES,
  SEND_VOTES_SUCCESS,
  SEND_VOTES_ERROR,
} from './constants';




export function changePollQueryString(pollQueryString) {
  return {
    type: CHANGE_POLL_QUERY_STRING,
    pollQueryString,
  };
}

export function fetchAllPolls() {
  return {
    type: FETCH_ALL_POLLS,
  };
}
export function fetchAllPolls_success(jsonData) {
  return {
    type: FETCH_ALL_POLLS_SUCCESS,
    jsonData,
  };
}
export function fetchAllPolls_error(jsonData) {
  return {
    type: FETCH_ALL_POLLS_ERROR,
    jsonData,
  };
}

export function selectPollRow(poll) {
  return {
    type: SELECT_POLL_ROW,
    poll,
  };
}

export function changeSelectDialogCandidate(value, userId) {
  return {
    type: CHANGE_CHB_CANDIDATE_SELECTION,
    userId: userId,
    checked: value,
  };
}

export function closePollDetails() {
  return {
    type: CLOSE_POLL_DETAILS,
  };
}

export function sendVotes() {
  return {
    type: SEND_VOTES,
  };
}
export function sendVotes_success(jsonData) {
  return {
    type: SEND_VOTES_SUCCESS,
    jsonData,
  };
}
export function sendVotes_error(jsonData) {
  return {
    type: SEND_VOTES_ERROR,
    jsonData,
  };

}

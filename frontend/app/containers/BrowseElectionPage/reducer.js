import produce from 'immer';
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



export const initialState = {
  // model
  polls: [],
  pollQueryString: "",

  pollInDialog: null,
  candidates: [],
  selectedCandidates: [],
  // validation

};

const browseElectionReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {

      case CHANGE_POLL_QUERY_STRING:
        draft.pollQueryString = action.pollQueryString;
        break;

      case FETCH_ALL_POLLS:
        break;

      case FETCH_ALL_POLLS_SUCCESS:
        draft.polls = action.jsonData;
        break;

      case FETCH_ALL_POLLS_ERROR:
        break;


      case SELECT_POLL_ROW:
        draft.pollInDialog = action.poll
        draft.isVoteDialogOpen = true
        draft.selectedCandidates = []
        break;
      case CHANGE_CHB_CANDIDATE_SELECTION:
        draft.selectedCandidates = []

        if (action.checked == true) {
          if(draft.selectedCandidates.indexOf(action.userId) === -1) {
            draft.selectedCandidates.push(action.userId);
          }
        } else {
          draft.selectedCandidates = draft.selectedCandidates.filter(el => el !== action.userId);
        }
        break;
      case CLOSE_POLL_DETAILS:
        draft.pollInDialog = null
        draft.isVoteDialogOpen = false
        draft.selectedCandidates = []
        break;


      case SEND_VOTES:
        break;

      case SEND_VOTES_SUCCESS:
        break;

      case SEND_VOTES_ERROR:
        break;

    }
  });

export default browseElectionReducer;

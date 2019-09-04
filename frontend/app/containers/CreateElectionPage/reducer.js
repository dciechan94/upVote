import produce from 'immer';
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
} from './constants';

// The initial state of the App
export const initialState = {
  // model
  name: "",
  description: "",
  startDate: new Date(),
  endDate: new Date(),
  publishDate: new Date(),
  selectedUsers: [],
  createdUsers: [],
  users: [],
  addUserQueryString: "",

  editablePollId: -1,
  editablePoll: null,
  // validation
  isNamePopulated: false,
  isDatesInOrder: true,
  isCantidateListNotEmpty: false,
};

/* eslint-disable default-case, no-param-reassign */
const createElectionReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {

      case CHANGE_NAME:
        draft.name = action.name;
        draft.isNamePopulated = action.name.length > 0;
        break;

      case CHANGE_DESCRIPTION:
        draft.description = action.description;
        break;

      case CHANGE_START_DATE:
        draft.startDate = action.startDate;
        //console.log(action.startDate)
        //console.log(action.startDate.getTime())
        break;

      case CHANGE_END_DATE:
        draft.endDate = action.endDate;
        break;

      case CHANGE_START_END_DATE:
        draft.startDate = action.startEndDate[0];
        draft.endDate = action.endDate[1];
        break;

      case CHANGE_PUBLISH_DATE:
        draft.publishDate = action.publishDate;
        break;

      case CHANGE_USER_QUERY_STRING:
        draft.addUserQueryString = action.addUserQueryString;
        break;

      case ADD_SELECTED_USER:
        draft.selectedUsers = action.nextSelectedUsers
        draft.createdUsers = action.nextCreatedUsers
        draft.users = action.nextUsers
        break;

      case REMOVE_SELECTED_USER:
        draft.selectedUsers = action.nextSelectedUsers
        draft.createdUsers = action.nextCreatedUsers
        draft.users = action.nextUsers
        break;

      case CREATE_NEW_POLL:
        break;

      case CREATE_NEW_POLL_SUCCESS:
        break;

      case CREATE_NEW_POLL_ERROR:
        break;

      case FETCH_ALL_USERS:
        break;

      case FETCH_ALL_USERS_SUCCESS:
        draft.users = action.jsonData
        break;

      case FETCH_ALL_USERS_ERROR:
        break;

      case FETCH_POLL_DETAILS:
        draft.editablePollId = action.pollId;
        break;

      case FETCH_POLL_DETAILS_SUCCESS:
        draft.editablePoll = action.jsonData;

        draft.name = action.jsonData.name;
        draft.description = action.jsonData.description;
        draft.startDate = new Date(action.jsonData.startDate);
        draft.endDate = new Date(action.jsonData.endDate);
        draft.publishDate = new Date(action.jsonData.publishDate);
        draft.selectedUsers = action.jsonData.candidates;
        draft.createdUsers = action.jsonData.candidates;
        break;

    }
  });

export default createElectionReducer;

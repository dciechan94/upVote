import produce from 'immer';
import {
  CHANGE_EMAIL,
  CHANGE_FIRST_NAME,
  CHANGE_LAST_NAME,
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_REPEAT,
  EDIT_PROFILE,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_ERROR,
  FETCH_USER_DATA,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_ERROR,
} from './constants';



export const initialState = {
  // model
  email: "",
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  passwordRepeat: "",
  // validation

};

const profileReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {

      case CHANGE_EMAIL:
        draft.email = action.email;
        break;

      case CHANGE_FIRST_NAME:
        draft.firstName = action.firstName;
        break;

      case CHANGE_LAST_NAME:
        draft.lastName = action.lastName;
        break;

      case CHANGE_USERNAME:
        draft.username = action.username;
        break;

      case CHANGE_PASSWORD:
        draft.password = action.password;
        break;

      case CHANGE_PASSWORD_REPEAT:
        draft.passwordRepeat = action.passwordRepeat;
        break;

      case EDIT_PROFILE:
        break;
      case EDIT_PROFILE_SUCCESS:
        break;
      case EDIT_PROFILE_ERROR:
        break;
      case FETCH_USER_DATA:
        break;
      case FETCH_USER_DATA_SUCCESS:
        draft.email = action.jsonData.email;
        draft.firstName = action.jsonData.firstName;
        draft.lastName = action.jsonData.lastName;
        draft.username = action.jsonData.login;
        draft.password = "";
        draft.passwordRepeat = "";
        break;
      case FETCH_USER_DATA_ERROR:
        break;

    }
  });

export default profileReducer;

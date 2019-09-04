import produce from 'immer';
import { push } from 'connected-react-router/immutable';

import { OPEN_GLOBAL_DIALOG, CLOSE_GLOBAL_DIALOG } from './constants';
import {
  POST_LOGIN_SUCCESS,
} from 'containers/LoginPage/constants';

import {
  POST_LOGOUT,
} from 'components/Header/constants';
import { Intent } from '@blueprintjs/core';



export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },

  userId: -1,
  userName: "<noName>",
  userFirstName: "<noFirstName>",
  userLastName: "<noLastName>",
  userEmail: "<noEmail>",
  userRoles: [],
  //token: "QWRtaW5pc3RyYXRvcjpaYXExMjNlZGM=",
  token: "",
  isAuthenticated: false,


  globalDialogIcon: "issue",
  globalDialogTitle: "noTitle",
  globalDialogIntent: Intent.NONE,
  isGlobalDialogOpen: false,
  globalDialogMessage: "noMessage",
  globalDialogButtonText: "noButtonText",
};


const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {

      case OPEN_GLOBAL_DIALOG:
        draft.globalDialogIcon = action.config.icon;
        draft.globalDialogTitle = action.config.title;
        draft.globalDialogIntent = action.config.intent;
        draft.isGlobalDialogOpen = true;
        draft.globalDialogMessage = action.config.message;
        draft.globalDialogButtonText = action.config.buttonText;
        break;

      case CLOSE_GLOBAL_DIALOG:
        draft.isGlobalDialogOpen = false;
        break;

      case POST_LOGIN_SUCCESS:
        draft.userId = action.jsonData.id;
        draft.userName = action.jsonData.login;
        draft.userFirstName = action.jsonData.firstName;
        draft.userLastName = action.jsonData.lastName;
        draft.userEmail = action.jsonData.email;
        draft.userRoles = action.jsonData.roles;
        draft.token = action.jsonData.token;
        draft.isAuthenticated = true;
        break;

      case POST_LOGOUT:
        draft.userId = -1;
        draft.userName = "<noName>";
        draft.userFirstName = "<noFirstName>";
        draft.userLastName = "<noLastName>";
        draft.userEmail = "<noEmail>";
        draft.userRoles = [];
        draft.token = "";
        draft.isAuthenticated = false;
        break;
    }
  });

export default appReducer;

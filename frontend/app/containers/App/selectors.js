import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectUserId = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userId,
  );

const makeSelectUserFirstName = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userFirstName,
  );

const makeSelectUserLastName = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userLastName,
  );

const makeSelectUserIsAuthenticated = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isAuthenticated,
  );

const makeSelectUserRoles = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userRoles,
  );
const makeSelectToken = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.token,
  );


const makeSelectGlobalDialogIcon = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.globalDialogIcon,
  );
const makeSelectOnGlobalDialogClose = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.onGlobalDialogClose,
  );
const makeSelectGlobalDialogTitle = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.globalDialogTitle,
  );
const makeSelectGlobalDialogIntent = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.globalDialogIntent,
  );
const makeSelectIsGlobalDialogOpen = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isGlobalDialogOpen,
  );
const makeSelectGlobalDialogMessage = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.globalDialogMessage,
  );
const makeSelectOnGlobalDialogButtonClick = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.onGlobalDialogButtonClick,
  );
const makeSelectGlobalDialogButtonText = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.globalDialogButtonText,
  );


export {
  selectGlobal,
  makeSelectLocation,
  makeSelectUserId,
  makeSelectUserFirstName,
  makeSelectUserLastName,
  makeSelectUserIsAuthenticated,
  makeSelectUserRoles,
  makeSelectToken,

  makeSelectGlobalDialogIcon,
  makeSelectOnGlobalDialogClose,
  makeSelectGlobalDialogTitle,
  makeSelectGlobalDialogIntent,
  makeSelectIsGlobalDialogOpen,
  makeSelectGlobalDialogMessage,
  makeSelectOnGlobalDialogButtonClick,
  makeSelectGlobalDialogButtonText,
};

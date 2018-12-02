/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectRepos = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

const makeSelectFirstName = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('firstNameUI')
);


const makeSelectIsUserAuthenticated = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('isUserAuthenticated')
);
const makeSelectUserFirstName = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('userFirstName')
);
const makeSelectUserLastName = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('userLastName')
);
const makeSelectUserRoles = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('userRoles')
);
const makeSelectUserAuthToken = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('userAuthToken')
);

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectFirstName,

  makeSelectIsUserAuthenticated,
  makeSelectUserFirstName,
  makeSelectUserLastName,
  makeSelectUserRoles,
  makeSelectUserAuthToken,
};

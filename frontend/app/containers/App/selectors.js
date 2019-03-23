/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.get('global', initialState);

const selectRouter = state => state.get('router');

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (appState) => appState.get('currentUser')
);


export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLocation,
};

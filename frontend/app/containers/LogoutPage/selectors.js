/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.get('username')
);

const makeSelectFirstName2 = () => createSelector(
  selectHome,
  (homeState) => homeState.get('firstNameUI')
);

export {
  selectHome,
  makeSelectUsername,
  makeSelectFirstName2,
};

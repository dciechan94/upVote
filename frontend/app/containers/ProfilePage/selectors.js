import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProfile = state => state.profile || initialState;

const makeSelectEmail = () =>
  createSelector(
    selectProfile,
    (profileState) => profileState.email
  );

const makeSelectFirstName = () =>
  createSelector(
    selectProfile,
    (profileState) => profileState.firstName
  );

const makeSelectLastName = () =>
  createSelector(
    selectProfile,
    (profileState) => profileState.lastName
  );

const makeSelectUsername = () =>
  createSelector(
    selectProfile,
    (profileState) => profileState.username
  );

const makeSelectPassword = () =>
  createSelector(
    selectProfile,
    (profileState) => profileState.password
  );

const makeSelectPasswordRepeat = () =>
  createSelector(
    selectProfile,
    (profileState) => profileState.passwordRepeat
  );

export {
  selectProfile,

  makeSelectEmail,
  makeSelectFirstName,
  makeSelectLastName,
  makeSelectUsername,
  makeSelectPassword,
  makeSelectPasswordRepeat,
};

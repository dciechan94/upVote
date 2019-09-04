import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLogin = state => state.login || initialState;

const makeSelectEmail = () =>
  createSelector(
    selectLogin,
    (loginState) => loginState.email
  );
const makeSelectPassword = () =>
  createSelector(
    selectLogin,
    (loginState) => loginState.password
  );

const makeSelectIsEmailValid = () =>
  createSelector(
    selectLogin,
    (loginState) => loginState.isEmailValid
  );
const makeSelectIsPasswordValid = () =>
  createSelector(
    selectLogin,
    (loginState) => loginState.isPasswordValid
  );

export {
  selectLogin,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectIsEmailValid,
  makeSelectIsPasswordValid,
};

/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectLogin = (state) => state.get('login');


const makeSelectEmail = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('email')
);
const makeSelectPassword = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('password')
);


const makeSelectIsEmailValid = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('isEmailValid')
);
const makeSelectIsPasswordValid = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('isPasswordValid')
);

const makeSelectSysFirstName = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('sysFirstName')
);


export {
  selectLogin,
  makeSelectEmail,
  makeSelectPassword,

  makeSelectIsEmailValid,
  makeSelectIsPasswordValid,

  makeSelectSysFirstName,
};

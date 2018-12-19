import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.get('loginPage', initialState);

/**
 * Other specific selectors
 */
const makeSelectEmail = () => createSelector(
  selectLoginPageDomain,
  (loginState) => loginState.get('email')
);
const makeSelectPassword = () => createSelector(
  selectLoginPageDomain,
  (loginState) => loginState.get('password')
);


const makeSelectIsEmailValid = () => createSelector(
  selectLoginPageDomain,
  (loginState) => loginState.get('isEmailValid')
);
const makeSelectIsPasswordValid = () => createSelector(
  selectLoginPageDomain,
  (loginState) => loginState.get('isPasswordValid')
);

const makeSelectSysFirstName = () => createSelector(
  selectLoginPageDomain,
  (loginState) => loginState.get('sysFirstName')
);

/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () =>
  createSelector(selectLoginPageDomain, substate => substate.toJS());

export default makeSelectLoginPage;
export { 
  selectLoginPageDomain,
  makeSelectEmail,
  makeSelectPassword,

  makeSelectIsEmailValid,
  makeSelectIsPasswordValid,

  makeSelectSysFirstName, };

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the registerPage state domain
 */

const selectRegisterPageDomain = state =>
  state.get('registerPage', initialState);

/**
 * Other specific selectors
 */
const makeSelectRegistrationCode = () => createSelector(
  selectRegisterPageDomain,
  (registerState) => registerState.get('registrationCode')
);

const makeSelectEmail = () => createSelector(
  selectRegisterPageDomain,
  (registerState) => registerState.get('email')
);

const makeSelectFirstName = () => createSelector(
  selectRegisterPageDomain,
  (registerState) => registerState.get('firstName')
);

const makeSelectLastName = () => createSelector(
  selectRegisterPageDomain,
  (registerState) => registerState.get('lastName')
);

const makeSelectPassword = () => createSelector(
  selectRegisterPageDomain,
  (registerState) => registerState.get('password')
);

const makeSelectPasswordRepeat = () => createSelector(
  selectRegisterPageDomain,
  (registerState) => registerState.get('passwordRepeat')
);



const makeSelectIsRegistrationCodeValid = () => createSelector(
  selectRegisterPageDomain,
  (registerState) => registerState.get('isRegistrationCodeValid')
);
const makeSelectIsEmailValid = () => createSelector(
  selectRegisterPageDomain,
  (registerState) => registerState.get('isEmailValid')
);
const makeSelectIsFirstNameValid = () => createSelector(
  selectRegisterPageDomain,
  (registerState) => registerState.get('isFirstNameValid')
);
const makeSelectIsLastNameValid = () => createSelector(
  selectRegisterPageDomain,
  (registerState) => registerState.get('isLastNameValid')
);
const makeSelectIsPasswordValid = () => createSelector(
  selectRegisterPageDomain,
  (registerState) => registerState.get('isPasswordValid')
);
const makeSelectIsPasswordRepeatValid = () => createSelector(
  selectRegisterPageDomain,
  (registerState) => registerState.get('isPasswordRepeatValid')
);

const makeSelectShowRegistrationResultModal = () => createSelector(
  selectRegisterPageDomain,
  (registerState) => registerState.get('showRegistrationResultModal')
);
const makeSelectIsRegistrationResultError = () => createSelector(
  selectRegisterPageDomain,
  (registerState) => registerState.get('isRegistrationResultError')
);
const makeSelectRegistrationResultMessage = () => createSelector(
  selectRegisterPageDomain,
  (registerState) => registerState.get('registrationResultMessage')
);
/**
 * Default selector used by RegisterPage
 */

const makeSelectRegisterPage = () =>
  createSelector(selectRegisterPageDomain, substate => substate.toJS());

export default makeSelectRegisterPage;
export {
  selectRegisterPageDomain,
  makeSelectRegistrationCode,
  makeSelectEmail,
  makeSelectFirstName,
  makeSelectLastName,
  makeSelectPassword,
  makeSelectPasswordRepeat,

  makeSelectIsRegistrationCodeValid,
  makeSelectIsEmailValid,
  makeSelectIsFirstNameValid,
  makeSelectIsLastNameValid,
  makeSelectIsPasswordValid,
  makeSelectIsPasswordRepeatValid,

  makeSelectShowRegistrationResultModal,
  makeSelectIsRegistrationResultError,
  makeSelectRegistrationResultMessage,
};

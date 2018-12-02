/**
 * RegisterPage selectors
 */

import { createSelector } from 'reselect';

const selectRegister = (state) => state.get('register');

const makeSelectRegistrationCode = () => createSelector(
  selectRegister,
  (registerState) => registerState.get('registrationCode')
);

const makeSelectEmail = () => createSelector(
  selectRegister,
  (registerState) => registerState.get('email')
);

const makeSelectFirstName = () => createSelector(
  selectRegister,
  (registerState) => registerState.get('firstName')
);

const makeSelectLastName = () => createSelector(
  selectRegister,
  (registerState) => registerState.get('lastName')
);

const makeSelectPassword = () => createSelector(
  selectRegister,
  (registerState) => registerState.get('password')
);

const makeSelectPasswordRepeat = () => createSelector(
  selectRegister,
  (registerState) => registerState.get('passwordRepeat')
);



const makeSelectIsRegistrationCodeValid = () => createSelector(
  selectRegister,
  (registerState) => registerState.get('isRegistrationCodeValid')
);
const makeSelectIsEmailValid = () => createSelector(
  selectRegister,
  (registerState) => registerState.get('isEmailValid')
);
const makeSelectIsFirstNameValid = () => createSelector(
  selectRegister,
  (registerState) => registerState.get('isFirstNameValid')
);
const makeSelectIsLastNameValid = () => createSelector(
  selectRegister,
  (registerState) => registerState.get('isLastNameValid')
);
const makeSelectIsPasswordValid = () => createSelector(
  selectRegister,
  (registerState) => registerState.get('isPasswordValid')
);
const makeSelectIsPasswordRepeatValid = () => createSelector(
  selectRegister,
  (registerState) => registerState.get('isPasswordRepeatValid')
);

const makeSelectShowRegistrationResultModal = () => createSelector(
  selectRegister,
  (registerState) => registerState.get('showRegistrationResultModal')
);
const makeSelectIsRegistrationResultError = () => createSelector(
  selectRegister,
  (registerState) => registerState.get('isRegistrationResultError')
);
const makeSelectRegistrationResultMessage = () => createSelector(
  selectRegister,
  (registerState) => registerState.get('registrationResultMessage')
);


export {
  selectRegister,
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
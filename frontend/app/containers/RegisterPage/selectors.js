import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRegister = state => state.register || initialState;


const makeSelectRegistrationCode = () =>
  createSelector(
    selectRegister,
    (registerState) => registerState.registrationCode
  );

const makeSelectEmail = () =>
  createSelector(
    selectRegister,
    (registerState) => registerState.email
  );

const makeSelectFirstName = () =>
  createSelector(
    selectRegister,
    (registerState) => registerState.firstName
  );

const makeSelectLastName = () =>
  createSelector(
    selectRegister,
    (registerState) => registerState.lastName
  );

const makeSelectPassword = () =>
  createSelector(
    selectRegister,
    (registerState) => registerState.password
  );

const makeSelectPasswordRepeat = () =>
  createSelector(
    selectRegister,
    (registerState) => registerState.passwordRepeat
  );

const makeSelectIsRegistrationCodeValid = () =>
  createSelector(
    selectRegister,
    (registerState) => registerState.isRegistrationCodeValid
  );
const makeSelectIsEmailValid = () =>
  createSelector(
    selectRegister,
    (registerState) => registerState.isEmailValid
  );
const makeSelectIsFirstNameValid = () =>
  createSelector(
    selectRegister,
    (registerState) => registerState.isFirstNameValid
  );
const makeSelectIsLastNameValid = () =>
  createSelector(
    selectRegister,
    (registerState) => registerState.isLastNameValid
  );
const makeSelectIsPasswordValid = () =>
  createSelector(
    selectRegister,
    (registerState) => registerState.isPasswordValid
  );
const makeSelectIsPasswordRepeatValid = () =>
  createSelector(
    selectRegister,
    (registerState) => registerState.isPasswordRepeatValid
  );
const makeSelectTermsCheckBoxValue = () =>
  createSelector(
    selectRegister,
    (registerState) => registerState.termsCheckBoxValue
  );

const makeSelectShowRegistrationResultModal = () =>
  createSelector(
    selectRegister,
    (registerState) => registerState.showRegistrationResultModal
  );
const makeSelectIsRegistrationResultError = () =>
  createSelector(
    selectRegister,
    (registerState) => registerState.isRegistrationResultError
  );
const makeSelectRegistrationResultMessage = () =>
  createSelector(
    selectRegister,
    (registerState) => registerState.registrationResultMessage
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
  makeSelectTermsCheckBoxValue,

  makeSelectShowRegistrationResultModal,
  makeSelectIsRegistrationResultError,
  makeSelectRegistrationResultMessage,
};

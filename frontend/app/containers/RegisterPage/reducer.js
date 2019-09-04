import produce from 'immer';
import {
  CHANGE_REGISTRATION_CODE,
  CHANGE_EMAIL,
  CHANGE_FIRST_NAME,
  CHANGE_LAST_NAME,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_REPEAT,
  CHANGE_TERMS_CHECKBOX_VALUE,
  POST_NEW_USER,
  POST_NEW_USER_SUCCESS,
  POST_NEW_USER_ERROR,
  CLOSE_REGISTRATION_RESULT_MODAL,
} from './constants';


export const initialState = {
  registrationCode: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  passwordRepeat: "",

  isRegistrationCodeValid: true,
  isEmailValid: true,
  isFirstNameValid: true,
  isLastNameValid: true,
  isPasswordValid: true,
  isPasswordRepeatValid: true,
  termsCheckBoxValue: false,

  showRegistrationResultModal: false,
  isRegistrationResultError: true,
  registrationResultMessage: [],
};

const registerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {

      case CHANGE_REGISTRATION_CODE:
        var formatedCode = action.registrationCode.replace(/@/gi, '');
        draft.registrationCode = formatedCode;
        draft.isRegistrationCodeValid = formatedCode.length > 0;
        break;

      case CHANGE_EMAIL:
        var emailRegexp = RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
        draft.email = action.email;
        draft.isEmailValid = emailRegexp.test(action.email);
        break;

      case CHANGE_FIRST_NAME:
        draft.firstName = action.firstName;
        draft.isFirstNameValid = action.firstName.length > 0;
        break;

      case CHANGE_LAST_NAME:
        draft.lastName = action.lastName;
        draft.isLastNameValid = action.lastName.length > 0;
        break;

      case CHANGE_PASSWORD:
        draft.password = action.password;
        draft.isPasswordValid = action.password.length > 0;
        break;

      case CHANGE_PASSWORD_REPEAT:
        draft.passwordRepeat = action.passwordRepeat;
        draft.isPasswordRepeatValid = action.passwordRepeat.length > 0;
        break;

      case CHANGE_TERMS_CHECKBOX_VALUE:
        draft.termsCheckBoxValue = !state.termsCheckBoxValue;
        break;

      case POST_NEW_USER_SUCCESS:
        draft.registrationCode = "";
        draft.email = "";
        draft.firstName = "";
        draft.lastName = "";
        draft.password = "";
        draft.passwordRepeat = "";
        draft.showRegistrationResultModal = true;
        draft.isRegistrationResultError = false;
        draft.registrationResultMessage= ["You have successfully created a new account. You can now Sign In."];
        break;

      case POST_NEW_USER_ERROR:
        draft.showRegistrationResultModal = true;
        draft.isRegistrationResultError = true;
        draft.registrationResultMessage = [action.jsonData.message]
        break;

      case CLOSE_REGISTRATION_RESULT_MODAL:
        draft.showRegistrationResultModal = false;
        draft.isRegistrationResultError = false;
        break;
    }
  });

export default registerReducer;

import { defineMessages } from 'react-intl';

export const scope = 'app.components.RegistrationForm';

export default defineMessages({
  registrationCode: {
    id: `${scope}.registrationCode`,
    defaultMessage: 'Registration code',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
  firstName: {
    id: `${scope}.firstName`,
    defaultMessage: 'First name',
  },
  lastName: {
    id: `${scope}.lastName`,
    defaultMessage: 'Last name',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  passwordRepeat: {
    id: `${scope}.passwordRepeat`,
    defaultMessage: 'Repeat password',
  },
  registerButtonText: {
    id: `${scope}.registerButtonText`,
    defaultMessage: 'Register',
  },
  modalHeading: {
    id: `${scope}.modalHeading`,
    defaultMessage: 'This is the RegistrationForm component!',
  },
  modalLabel: {
    id: `${scope}.modalLabel`,
    defaultMessage: 'This is the RegistrationForm component!',
  },
  lockButtonToolTip: {
    id: `${scope}.lockButtonToolTip`,
    defaultMessage: 'Keep you password safe and secret!',
  },
  requiredTip: {
    id: `${scope}.requiredTip`,
    defaultMessage: '(required)',
  },
  termsOfServiceAccept: {
    id: `${scope}.termsOfServiceAccept`,
    defaultMessage: 'I agree and accept the Terms of Service.',
  },
});

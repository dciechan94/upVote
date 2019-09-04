import { defineMessages } from 'react-intl';

export const scope = 'app.components.LoginForm';

export default defineMessages({
  emailLoginFormLabel: {
    id: `${scope}.emailLoginForm.label`,
    defaultMessage: 'Email',
  },
  emailLoginFormInputPlaceholder: {
    id: `${scope}.emailLoginForm.input.placeholder`,
    defaultMessage: 'Enter username or email',
  },
  passwordFormLabel: {
    id: `${scope}.passwordForm.label`,
    defaultMessage: 'Password',
  },
  passwordFormInputPlaceholder: {
    id: `${scope}.passwordForm.input.placeholder`,
    defaultMessage: 'Enter password',
  },
  createAccount: {
    id: `${scope}.createAccount`,
    defaultMessage: 'Create account',
  },
  loginButtonText: {
    id: `${scope}.loginButtonText`,
    defaultMessage: 'Enter',
  },
  lockButtonToolTip: {
    id: `${scope}.lockButtonToolTip`,
    defaultMessage: 'Keep you password safe and secret!',
  },
});

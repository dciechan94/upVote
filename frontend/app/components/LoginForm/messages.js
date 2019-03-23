/*
 * LoginForm Messages
 *
 * This contains all the text for the LoginForm component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.LoginForm';

export default defineMessages({
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  createAccount: {
    id: `${scope}.createAccount`,
    defaultMessage: 'Create account',
  },
  loginButtonText: {
    id: `${scope}.loginButtonText`,
    defaultMessage: 'Enter',
  }
});

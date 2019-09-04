import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LoginPage';

export default defineMessages({
  helmetTitle: {
    id: `${scope}.helmet.title`,
    defaultMessage: 'Sign up',
  },
  helmetDescription: {
    id: `${scope}.helmet.description`,
    defaultMessage: 'Fill in the register form to create new user.',
  },
});

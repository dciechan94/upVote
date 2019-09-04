import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProfilePage';

export default defineMessages({
  helmetTitle: {
    id: `${scope}.helmet.title`,
    defaultMessage: 'Profile',
  },
  helmetDescription: {
    id: `${scope}.helmet.description`,
    defaultMessage: 'Profile page to edit user data.',
  },
  userData: {
    id: `${scope}.userData`,
    defaultMessage: 'User profile data:',
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
  username: {
    id: `${scope}.username`,
    defaultMessage: 'Username',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  passwordRepeat: {
    id: `${scope}.passwordRepeat`,
    defaultMessage: 'Repeat password',
  },
  applyEditButtonText: {
    id: `${scope}.applyEditButtonText`,
    defaultMessage: 'Save',
  },
});

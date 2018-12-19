/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  signIn: {
    id: `${scope}.signIn`,
    defaultMessage: 'Sign In',
  },
  signOut: {
    id: `${scope}.signOut`,
    defaultMessage: 'Sign Out',
  },
  pedagogicalUniversity: {
    id: `${scope}.pedagogicalUniversity`,
    defaultMessage: 'Pedagogical University',
  },
  voteApp: {
    id: `${scope}.voteApp`,
    defaultMessage: 'Vote',
  },
});

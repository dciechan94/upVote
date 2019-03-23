/*
 * MenuBar Messages
 *
 * This contains all the text for the MenuBar container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.MenuBar';

export default defineMessages({
  actualVotings: {
    id: `${scope}.actualVotings`,
    defaultMessage: 'Actual',
  },
  archivedVotings: {
    id: `${scope}.archivedVotings`,
    defaultMessage: 'Archive',
  },
  pollsSubmenu: {
    id: `${scope}.pollsSubmenu`,
    defaultMessage: 'Polls...',
  },
  createPoll: {
    id: `${scope}.createPoll`,
    defaultMessage: 'Create',
  },
  managePolls: {
    id: `${scope}.managePolls`,
    defaultMessage: 'Manage',
  },
  usersSubmenu: {
    id: `${scope}.usersSubmenu`,
    defaultMessage: 'Users...',
  },
  generateTokens: {
    id: `${scope}.generateTokens`,
    defaultMessage: 'Generate tokens',
  },
  manageUsers: {
    id: `${scope}.manageUsers`,
    defaultMessage: 'Manage',
  },
});

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.MenuBar';

export default defineMessages({
  actualVotings: {
    id: `${scope}.actualVotings`,
    defaultMessage: 'Actual polls',
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
  termsOfService: {
    id: `${scope}.termsOfService`,
    defaultMessage: 'Terms of Service',
  },
  usersMainMenu: {
    id: `${scope}.usersMainMenu`,
    defaultMessage: 'Users',
  },
  voteMainMenu: {
    id: `${scope}.voteMainMenu`,
    defaultMessage: 'Vote!',
  },
  pollsMainMenu: {
    id: `${scope}.pollsMainMenu`,
    defaultMessage: 'Polls',
  },

});

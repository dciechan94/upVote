import { defineMessages } from 'react-intl';

export const scope = 'app.containers.BrowseElectionPage';

export default defineMessages({
  helmetTitle: {
    id: `${scope}.helmet.title`,
    defaultMessage: 'Browse polls',
  },
  helmetDescription: {
    id: `${scope}.helmet.description`,
    defaultMessage: 'Browse page to find voting polls.',
  },
  listOfPolls: {
    id: `${scope}.listOfPolls`,
    defaultMessage: 'List of voting polls:',
  },
  pollQueryString: {
    id: `${scope}.pollQueryString`,
    defaultMessage: 'Search',
  },
  noResults: {
    id: `${scope}.noResults`,
    defaultMessage: 'No results.',
  },
  tableName: {
    id: `${scope}.tableName`,
    defaultMessage: 'Name',
  },
  tableDescription: {
    id: `${scope}.tableDescription`,
    defaultMessage: 'Description',
  },
  tableVotingTime: {
    id: `${scope}.tableVotingTime`,
    defaultMessage: 'Voting time',
  },
  tableResultsAnnounce: {
    id: `${scope}.tableResultsAnnounce`,
    defaultMessage: 'Results',
  },
  voteDialogCandidatesHeader: {
    id: `${scope}.voteDialogCandidatesHeader`,
    defaultMessage: 'Candidates:',
  },
  voteDialogVoteButton: {
    id: `${scope}.voteDialogVoteButton`,
    defaultMessage: 'Vote!',
  },
  voteDialogResultsHeader: {
    id: `${scope}.voteDialogResultsHeader`,
    defaultMessage: 'Results:',
  },
  voteDialogCloseButton: {
    id: `${scope}.voteDialogCloseButton`,
    defaultMessage: 'Close',
  },
  pollEditButton: {
    id: `${scope}.pollEditButton`,
    defaultMessage: 'Edit',
  },
});

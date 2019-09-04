import { defineMessages } from 'react-intl';

export const scope = 'app.containers.CreateElectionPage';

export default defineMessages({
  helmetTitle: {
    id: `${scope}.helmet.title`,
    defaultMessage: 'Create new poll',
  },
  helmetDescription: {
    id: `${scope}.helmet.description`,
    defaultMessage: 'Fill in the form to create new poll.',
  },
  createVotingHeader: {
    id: `${scope}.createVotingHeader`,
    defaultMessage: 'Create a poll:',
  },
  editVotingHeader: {
    id: `${scope}.editVotingHeader`,
    defaultMessage: 'Update poll:',
  },
  nameLabel: {
    id: `${scope}.forms.nameLabel`,
    defaultMessage: 'Name',
  },
  descriptionLabel: {
    id: `${scope}.forms.descriptionLabel`,
    defaultMessage: 'Description',
  },
  startEndDateLabel: {
    id: `${scope}.forms.startEndDateLabel`,
    defaultMessage: 'Voting date range',
  },
  publishDateLabel: {
    id: `${scope}.forms.publishDateLabel`,
    defaultMessage: 'Results publication date',
  },
  candidatesLabel: {
    id: `${scope}.forms.candidatesLabel`,
    defaultMessage: 'Candidates',
  },
  noResultsInSelect: {
    id: `${scope}.forms.noResultsInSelect`,
    defaultMessage: 'No results.',
  },
  selectPlaceholder: {
    id: `${scope}.forms.selectPlaceholder`,
    defaultMessage: 'Search...',
  },
  saveButtonText: {
    id: `${scope}.forms.saveButtonText`,
    defaultMessage: 'Save',
  },
  pollDeleteButton: {
    id: `${scope}.pollDeleteButton`,
    defaultMessage: 'Delete',
  },
});

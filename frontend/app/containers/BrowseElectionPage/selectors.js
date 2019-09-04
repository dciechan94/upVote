import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectBrowseElection = state => state.browseElection || initialState;

const makeSelectPolls = () =>
  createSelector(
    selectBrowseElection,
    (browseElectionState) => browseElectionState.polls
  );
const makeSelectPollQueryString = () =>
  createSelector(
    selectBrowseElection,
    (browseElectionState) => browseElectionState.pollQueryString
  );

const makeSelectCandidates = () =>
  createSelector(
    selectBrowseElection,
    (browseElectionState) => browseElectionState.candidates
  );
const makeSelectSelectedCandidates = () =>
  createSelector(
    selectBrowseElection,
    (browseElectionState) => browseElectionState.selectedCandidates
  );

const makeSelectPollInDialog = () =>
createSelector(
  selectBrowseElection,
  (browseElectionState) => browseElectionState.pollInDialog
);
const makeSelectIsVoteDialogOpen = () =>
createSelector(
  selectBrowseElection,
  (browseElectionState) => browseElectionState.isVoteDialogOpen
);

export {
  selectBrowseElection,

  makeSelectPolls,
  makeSelectPollQueryString,
  makeSelectCandidates,
  makeSelectSelectedCandidates,
  makeSelectPollInDialog,
  makeSelectIsVoteDialogOpen,
};

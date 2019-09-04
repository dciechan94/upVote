import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCreateElection = state => state.createElection || initialState;

const makeSelectName = () =>
  createSelector(
    selectCreateElection,
    (createElectionState) => createElectionState.name
  );
const makeSelectDescription = () =>
  createSelector(
    selectCreateElection,
    (createElectionState) => createElectionState.description
  );

const makeSelectStartDate = () =>
  createSelector(
    selectCreateElection,
    (createElectionState) => createElectionState.startDate
  );
const makeSelectEndDate = () =>
  createSelector(
    selectCreateElection,
    (createElectionState) => createElectionState.endDate
  );
const makeSelectStartEndDate = () =>
  createSelector(
    selectCreateElection,
    (createElectionState) => createElectionState.startEndDate
  );
const makeSelectPublishDate = () =>
createSelector(
  selectCreateElection,
  (createElectionState) => createElectionState.publishDate
);
const makeSelectUsers = () =>
createSelector(
  selectCreateElection,
  (createElectionState) => createElectionState.users
);
const makeSelectSelectedUsers = () =>
createSelector(
  selectCreateElection,
  (createElectionState) => createElectionState.selectedUsers
);
const makeSelectCreatedUsers = () =>
createSelector(
  selectCreateElection,
  (createElectionState) => createElectionState.createdUsers
);
const makeSelectUserQueryString = () =>
createSelector(
  selectCreateElection,
  (createElectionState) => createElectionState.userQueryString
);
const makeSelectIsNamePopulated = () =>
createSelector(
  selectCreateElection,
  (createElectionState) => createElectionState.isNamePopulated
);
const makeSelectIsDatesInOrder = () =>
createSelector(
  selectCreateElection,
  (createElectionState) => createElectionState.isDatesInOrder
);
const makeSelectIsCandidateListNotEmpty = () =>
createSelector(
  selectCreateElection,
  (createElectionState) => createElectionState.isCandidateListNotEmpty
);

const makeSelectEditablePollId = () =>
createSelector(
  selectCreateElection,
  (createElectionState) => createElectionState.editablePollId
);
const makeSelectEditablePoll = () =>
createSelector(
  selectCreateElection,
  (createElectionState) => createElectionState.editablePoll
);

export {
  selectCreateElection,
  makeSelectName,
  makeSelectDescription,
  makeSelectStartDate,
  makeSelectEndDate,
  makeSelectStartEndDate,
  makeSelectPublishDate,
  makeSelectUsers,
  makeSelectSelectedUsers,
  makeSelectCreatedUsers,
  makeSelectUserQueryString,
  makeSelectIsNamePopulated,
  makeSelectIsDatesInOrder,
  makeSelectIsCandidateListNotEmpty,

  makeSelectEditablePollId,
  makeSelectEditablePoll,
};

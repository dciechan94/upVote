import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import moment from 'moment';

import {
  Button,
  Card,
  FormGroup,
  InputGroup,
  Intent,
  TextArea,
} from '@blueprintjs/core';

import {
  DateInput,
  DateRangeInput,
  TimePrecision
} from "@blueprintjs/datetime";

import { H5, MenuItem } from "@blueprintjs/core";
import { MultiSelect } from "@blueprintjs/select";

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { changeName, changeDescription, changeStartDate, changeEndDate, changePublishDate, changeUserQueryString,
  addSelectedUser, removeSelectedUser, createNewPoll, fetchAllUsers, fetchPollDetails, updateExistingPoll,
  deletePoll } from './actions';
import { makeSelectName, makeSelectDescription, makeSelectStartDate, makeSelectEndDate, makeSelectPublishDate,
  makeSelectUsers, makeSelectSelectedUsers, makeSelectCreatedUsers, makeSelectUserQueryString,
  makeSelectIsNamePopulated, makeSelectIsDatesInOrder, makeSelectIsCandidateListNotEmpty,  } from './selectors'

import {
  makeSelectUserIsAuthenticated,
  makeSelectUserRoles,
} from 'containers/App/selectors'

const key = 'createElection';


export function CreateElectionPage({
  intl,
  match,
  isAuthenticated,
  userRoles,
  // model
  name,
  description,
  startDate,
  endDate,
  publishDate,
  selectedUsers,
  createdUsers,
  users,
  addUserQueryString,
  // validation
  isNamePopulated,
  isDatesInOrder,
  isCantidateListNotEmpty,
  // actions
  onChangeName,
  onChangeDescription,
  onChangeStartDate,
  onChangeEndDate,
  onStartEndDateChange,
  onChangePublishDate,
  onChangeUserQueryString,
  onAddSelectedUser,
  onRemoveSelectedUser,
  onFetchAllUsers,
  onSaveNewPoll,

  onFetchPollDetails,
  onSaveExistingPoll,

  onDeletePoll,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (match.params.id != null) {
      onFetchPollDetails(match.params.id);
    }
    onFetchAllUsers();
  }, []);

  const {formatMessage} = intl;

  // string => IDateFormatProps
  // momentFormatter("MM/DD/YYYY"),
  // momentFormatter("YYYY-MM-DD"),
  // momentFormatter("YYYY-MM-DD HH:mm:ss"),
  const momentFormatter = (format) => {
      return {
          formatDate: date => moment(date).format(format),
          parseDate: str => moment(str, format).toDate(),
          placeholder: `${format} (moment)`,
      };
  }

  const handleTagRemove = (tag, index) => {
    deselectUser(index);
  };

  const getSelectedUserIndex = (user) => {
    return selectedUsers.indexOf(user);
  }

  const isUserSelected = (user) => {
    return getSelectedUserIndex(user) !== -1;
  }

  const selectUser = (user) => {
    selectUsers([user]);
  }

  const selectUsers = (usersToSelect) => {
    let nextCreatedUsers = createdUsers.slice();
    let nextSelectedUsers = selectedUsers.slice();
    let nextUsers = users.slice();

    usersToSelect.forEach(user => {
        const results = maybeAddCreatedUserToArrays(nextUsers, nextCreatedUsers, user);
        nextUsers = results.users;
        nextCreatedUsers = results.createdUsers;
        // Avoid re-creating an item that is already selected (the "Create
        // Item" option will be shown even if it matches an already selected
        // item).
        nextSelectedUsers = !arrayContainsUser(nextSelectedUsers, user) ? [...nextSelectedUsers, user] : nextSelectedUsers;
    });
    onAddSelectedUser(nextUsers, nextSelectedUsers, nextCreatedUsers)
  }

  const deselectUser = (index) => {
    const selectedUser = selectedUsers[index];
    const { createdUsers: nextCreatedUsers, users: nextUsers } = maybeDeleteCreatedUserFromArrays(
        users,
        createdUsers,
        selectedUser,
    );
    onRemoveSelectedUser(nextUsers, selectedUsers.filter((_user, i) => i !== index), nextCreatedUsers)
}

  const handleUserSelect = (user) => {
    if (!isUserSelected(user)) {
        selectUser(user);
    } else {
        deselectUser(getSelectedUserIndex(user));
    }
};

/*export function areFilmsEqual(filmA: IFilm, filmB: IFilm) {
  // Compare only the titles (ignoring case) just for simplicity.
  return filmA.title.toLowerCase() === filmB.title.toLowerCase();
}

export function doesFilmEqualQuery(film: IFilm, query: string) {
  return film.title.toLowerCase() === query.toLowerCase();
}*/

const arrayContainsUser = (users, userToFind) => {
  return users.some((user) => user.firstName === userToFind.firstName);
}

const addUserToArray = (users, userToAdd) => {
  return [...users, userToAdd];
}

const deleteUserFromArray = (users, userToDelete) => {
  return users.filter(user => user !== userToDelete);
}

const maybeAddCreatedUserToArrays = (users, createdUsers, user) => {
  const isNewlyCreatedItem = !arrayContainsUser(users, user);

  return {
    createdUsers: isNewlyCreatedItem ? addUserToArray(createdUsers, user) : createdUsers,
    // Add a created film to `items` so that the film can be deselected.
    users: isNewlyCreatedItem ? addUserToArray(users, user) : users,
  };
}

const maybeDeleteCreatedUserFromArrays = (users, createdUsers, user) => {
  const wasItemCreatedByUser = arrayContainsUser(createdUsers, user);

  // Delete the item if the user manually created it.
  return {
      createdUsers: wasItemCreatedByUser ? deleteUserFromArray(createdUsers, user) : createdUsers,
      users: wasItemCreatedByUser ? deleteUserFromArray(users, user) : users,
  };
}

const handleUsersPaste = (films) => {
    // On paste, don't bother with deselecting already selected values, just
    // add the new ones.
    selectUsers(films);
};

const clearButton = selectedUsers.length > 0 ?
  <Button icon="cross" minimal={true} onClick={() =>{onRemoveSelectedUser(users, [], createdUsers)}} /> : undefined;


const filterUser = (query, user, _index, exactMatch) => {
    const normalizedName = (user.lastName + " " + user.firstName).toLowerCase();
    const normalizedQuery = query.toLowerCase();

    if (exactMatch) {
        return normalizedName === normalizedQuery;
    } else {
        return `${normalizedName} ${user.email.toLowerCase()}`.indexOf(normalizedQuery) >= 0;
    }
};

  return (
    <div>
      <Helmet>
        <title>{formatMessage(messages.helmetTitle)}</title>
        <meta
          name="description"
          content={formatMessage(messages.helmetDescription)}
        />
      </Helmet>
      <Card>
        <Card style={{margin: "auto", width: 600}}>
          {match.params.id == null ?
            <H5>{formatMessage(messages.createVotingHeader)}</H5> :
            <H5>{formatMessage(messages.editVotingHeader)}</H5>}
            <br></br>

          <FormGroup
            label = {formatMessage(messages.nameLabel)}
            labelFor = "name-form">

            <InputGroup
              id = "name-input"
              intent = {Intent.NONE}
              onChange = {onChangeName}
              value = {name}
            />
          </FormGroup>

          <FormGroup
            label = {formatMessage(messages.descriptionLabel)}
            labelFor = "description-form">

            <TextArea
              fill = {true}
              growVertically={true}
              large={true}
              intent={Intent.NONE}
              onChange={onChangeDescription}
              value={description}
            />
          </FormGroup>

          <FormGroup
            label = {formatMessage(messages.startEndDateLabel)}
            labelFor = "name-form">

            <DateInput
              formatDate = {date => moment(date).format('YYYY-MM-DD HH:mm')}
              parseDate = {str => new Date(str)}
              placeholder={'...'}

              value={startDate}

              reverseMonthAndYearMenus = {true}
              timePrecision = {TimePrecision.MINUTE}
              onChange={onChangeStartDate}
              closeOnSelection = {false}
            />
            &nbsp;&nbsp;
            <DateInput
              formatDate = {date => moment(date).format('YYYY-MM-DD HH:mm')}
              parseDate = {str => new Date(str)}
              placeholder={'...'}

              value={endDate}

              reverseMonthAndYearMenus = {true}
              timePrecision = {TimePrecision.MINUTE}
              closeOnSelection = {false}
              onChange={onChangeEndDate}
            />
          </FormGroup>

          <FormGroup
            label = {formatMessage(messages.publishDateLabel)}
            labelFor = "publishDate-form">

            <DateInput
              formatDate = {date => moment(date).format('YYYY-MM-DD HH:mm')}
              parseDate = {str => new Date(str)}
              placeholder={'...'}

              value={publishDate}

              reverseMonthAndYearMenus = {true}
              timePrecision = {TimePrecision.MINUTE}
              onChange={onChangePublishDate}
              closeOnSelection = {false}
            />
          </FormGroup>

          <FormGroup
            label = {formatMessage(messages.candidatesLabel)}
            labelFor = "candidates-form">

            <MultiSelect
              //appearance
              placeholder = {formatMessage(messages.selectPlaceholder)}
              fill = {true}
              noResults={<MenuItem disabled={true} text={formatMessage(messages.noResultsInSelect)} />}


              items={users}
              selectedItems={selectedUsers}

              itemRenderer={(user, { modifiers, handleClick }) => {
                if (!modifiers.matchesPredicate) {
                    return null;
                }
                return (
                    <MenuItem
                        active={modifiers.active}
                        icon={isUserSelected(user) ? "tick" : "blank"}
                        key={user.id}
                        label={user.email}
                        onClick={handleClick}
                        text={`${user.lastName} ${user.firstName}`}
                        shouldDismissPopover={false}
                    />
                );
            }
          }

              itemPredicate={filterUser}
              onItemSelect={handleUserSelect}
              tagRenderer={(user)=>user.lastName+" "+user.firstName}

              onItemsPaste={handleUsersPaste}
              popoverProps={{ minimal: true }}

              tagInputProps={{ tagProps: {intent: Intent.NONE, minimal: true },
                               onRemove: handleTagRemove,
                               rightElement: clearButton }}

            />
          </FormGroup>

          <br></br>
          <Button text={formatMessage(messages.saveButtonText)}
            onClick={match.params.id != null ? onSaveExistingPoll : onSaveNewPoll}/>
<br></br><br></br>
          {isAuthenticated && userRoles.includes("UPV_Administrator") && match.params.id != null ?
            <td>
              <Button onClick={(evt) => {evt.stopPropagation();onDeletePoll()}} intent={Intent.DANGER}>
                {formatMessage(messages.pollDeleteButton)}
              </Button>
            </td>
          : null }

        </Card>
      </Card>
    </div>
  );



}


CreateElectionPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  userRoles: PropTypes.arrayOf(PropTypes.string),
  // model
  name: PropTypes.string,
  description: PropTypes.string,

  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  publishDate: PropTypes.instanceOf(Date),
  users: PropTypes.array,
  selectedUsers: PropTypes.array,
  createdUsers: PropTypes.array,

  addUserQueryString: PropTypes.string,

  // validation
  isNamePopulated: PropTypes.bool,
  isDatesInOrder: PropTypes.bool,
  isCantidateListNotEmpty: PropTypes.bool,



  // actions
  onChangeName: PropTypes.func,
  onChangeDescription: PropTypes.func,
  onChangeStartDate: PropTypes.func,
  onChangeEndDate: PropTypes.func,
  onChangePublishDate: PropTypes.func,
  onChangeUserQueryString: PropTypes.func,

  onAddSelectedUser: PropTypes.func,
  onRemoveSelectedUser: PropTypes.func,

  onFetchAllUsers: PropTypes.func,
  onSaveNewPoll: PropTypes.func,

  onFetchPollDetails: PropTypes.func,
  onSaveExistingPoll: PropTypes.func,

  onDeletePoll: PropTypes.func,

  //onCloseRegistrationResultModal: PropTypes.func,
  //showRegistrationResultModal: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectUserIsAuthenticated(),
  userRoles: makeSelectUserRoles(),
  // model
  name: makeSelectName(),
  description: makeSelectDescription(),

  startDate: makeSelectStartDate(),
  endDate: makeSelectEndDate(),
  publishDate: makeSelectPublishDate(),
  users: makeSelectUsers(),
  selectedUsers: makeSelectSelectedUsers(),
  createdUsers: makeSelectCreatedUsers(),

  addUserQueryString: makeSelectUserQueryString(),

  // validation
  isNamePopulated: makeSelectIsNamePopulated(),
  isDatesInOrder: makeSelectIsDatesInOrder(),
  isCantidateListNotEmpty: makeSelectIsCandidateListNotEmpty(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeName: (evt) => dispatch(changeName(evt.target.value)),
    onChangeDescription: (evt) => dispatch(changeDescription(evt.target.value)),
    onChangeStartDate: (date, isUsrChg) => dispatch(changeStartDate(date)),
    onChangeEndDate: (date, isUsrChg) => dispatch(changeEndDate(date)),
    onStartEndDateChange: (evt) => dispatch(changeEndDate(evt.target.value)),
    onChangePublishDate: (date, isUsrChg) => dispatch(changePublishDate(date)),
    onChangeUserQueryString: (evt) => dispatch(changeUserQueryString(evt.target.value)),

    onAddSelectedUser: (users, selectedUsers, createdUsers) => dispatch(addSelectedUser(users, selectedUsers, createdUsers)),
    onRemoveSelectedUser: (users, selectedUsers, createdUsers) => dispatch(removeSelectedUser(users, selectedUsers, createdUsers)),

    onFetchAllUsers: () => dispatch(fetchAllUsers()),
    onSaveNewPoll: () => dispatch(createNewPoll()),

    onFetchPollDetails: (pollId) => dispatch(fetchPollDetails(pollId)),
    onSaveExistingPoll: () => dispatch(updateExistingPoll()),

    onDeletePoll: () => dispatch(deletePoll()),

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
  memo
)(CreateElectionPage);

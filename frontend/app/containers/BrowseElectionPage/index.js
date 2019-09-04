import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import { push } from 'connected-react-router/immutable';

import moment from 'moment';

import {
  Alignment,
  Button,
  Card,
  Checkbox,
  Classes,
  Dialog,
  FormGroup,
  H5,
  HTMLTable,
  Icon,
  InputGroup,
  Intent,
  Radio,
  RadioGroup,
  Tag,
} from '@blueprintjs/core';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { changePollQueryString, fetchAllPolls, selectPollRow, changeSelectDialogCandidate, closePollDetails,
  sendVotes } from './actions';
import { makeSelectPolls, makeSelectPollQueryString, makeSelectCandidates, makeSelectSelectedCandidates,
  makeSelectPollInDialog, makeSelectIsVoteDialogOpen } from './selectors'

import {
  makeSelectUserIsAuthenticated,
  makeSelectUserRoles,
} from 'containers/App/selectors'


const key = 'browseElection';

export function BrowseElectionPage({
  intl,
  isAuthenticated,
  userRoles,
  // model
  polls,
  pollQueryString,
  candidates,
  selectedCandidates,
  pollInDialog,

  // validation
  isVoteDialogOpen,

  // actions
  onChangePollQueryString,
  onFetchAllPolls,
  onSelectPollRow,
  onSelectDialogCandidate,
  onSendVote,
  onClosePollDetails,
  onEditPoll,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    onFetchAllPolls()
  }, []);

  const {formatMessage} = intl;

  const pollHasQueriedString = (query, poll) => {
    const normalizedName = (poll.name + " " + poll.description).toLowerCase();
    const normalizedQuery = query.toLowerCase();
    return `${normalizedName}`.indexOf(normalizedQuery) >= 0;
};

  const renderTablePolls = () => {
    var filteredPolls = polls.filter(poll => pollHasQueriedString(pollQueryString, poll))
    if (filteredPolls.length > 0) {
      return filteredPolls.map(poll => (
        <tr key={"row"+poll.id} onClick={() => onSelectPollRow(poll)}>
          <td key={"cell1_"+poll.id}>{poll.name}</td>
          <td key={"cell2_"+poll.id}>{poll.description}</td>
          <td key={"cell3_"+poll.id}>
            <Tag intent={Intent.PRIMARY}>{moment(new Date(poll.startDate)).format('YYYY-MM-DD HH:mm')}</Tag>
            <br></br>
            <Tag intent={Intent.WARNING}>{moment(new Date(poll.endDate)).format('YYYY-MM-DD HH:mm')}</Tag>
          </td>
          <td key={"cell4_"+poll.id}><Tag intent={Intent.SUCCESS}>{moment(new Date(poll.publishDate)).format('YYYY-MM-DD HH:mm')}</Tag></td>
          {isAuthenticated && userRoles.includes("UPV_Administrator") ?
            <td>
              <Button onClick={(evt) => {evt.stopPropagation();onEditPoll(poll.id)}}>
                {formatMessage(messages.pollEditButton)}
              </Button>
            </td>
          : null }
        </tr>
      ))
    } else {
      return (
        <tr>
          <td>{formatMessage(messages.noResults)}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      )
    }
  }

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
        <H5>{formatMessage(messages.listOfPolls)}</H5> <br></br>

        <div style={{width: 250}}>
        <FormGroup
          label={formatMessage(messages.pollQueryString)}
          labelFor="pollQueryString-input"
        >
          <InputGroup
            id="pollQueryString-input"
            intent={Intent.NONE}
            onChange={onChangePollQueryString}
          />
        </FormGroup>
        </div>

        <HTMLTable bordered interactive striped>
          <thead>
            <tr>
              <td><b>{formatMessage(messages.tableName)}</b></td>
              <td><b>{formatMessage(messages.tableDescription)}</b></td>
              <td><b>{formatMessage(messages.tableVotingTime)}</b></td>
              <td><b>{formatMessage(messages.tableResultsAnnounce)}</b></td>
              {isAuthenticated && userRoles.includes("UPV_Administrator") ?
                <td><b>Opcje</b></td>
              : null }

            </tr>
          </thead>
          <tbody>
            {renderTablePolls()}
          </tbody>
        </HTMLTable>

        <Dialog
          icon={<Icon icon="list-detail-view" iconSize={18} intent={Intent.PRIMARY} />}
          onClose={onClosePollDetails}
          title={pollInDialog==null ? "" : pollInDialog.name}//
          isOpen={isVoteDialogOpen}
        >
          <div className={Classes.DIALOG_BODY}>
            <section>
              {pollInDialog==null ? "" : pollInDialog.description}
            </section>
            <br></br>
            <br></br>

            {pollInDialog==null ? null : pollInDialog.results!=null ? null :
            <section>
              <section>
                <b>{formatMessage(messages.voteDialogCandidatesHeader)}</b>
              </section>
              <br></br>

              <section>
                {/*pollInDialog==null ? null : pollInDialog.candidates.map(user => (
                  <Checkbox key={"chb-"+user.id} alignIndicator={Alignment.LEFT} label={user.firstName}
                  onClick={(evt) => onSelectDialogCandidate(evt.target.checked, user.id)}/>
                ))*/}
                <RadioGroup
                  onChange={(evt) => onSelectDialogCandidate(true, evt.currentTarget.value)}
                  selectedValue={selectedCandidates[0]+""}
                >
                  {pollInDialog.candidates.map(user => (
                    <Radio key={"rad-"+user.id} alignIndicator={Alignment.LEFT} label={user.lastName+" "+user.firstName +"  ("+user.email +")"}
                    value={user.id+""}/>
                  ))}
                </RadioGroup>
              </section>
              <section>
                <Button onClick={onSendVote} disabled={selectedCandidates.length==0}>
                  {formatMessage(messages.voteDialogVoteButton)}
                </Button>
              </section>
            </section>
            }

            {pollInDialog==null || pollInDialog.results==null ? null :
              <section>
                <section>
                  <b>{formatMessage(messages.voteDialogResultsHeader)}</b>
                </section>
                <br></br>

                <section>
                  {pollInDialog.candidates.map(user => (
                      <div key={"div-"+user.id}>
                        {user.lastName} {user.firstName}  ({user.email}): {pollInDialog.results[user.id]}  <br></br>
                      </div>
                  ))}
                </section>
              </section>
            }


          </div>
          <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button onClick={onClosePollDetails}>{formatMessage(messages.voteDialogCloseButton)}</Button>
              </div>
          </div>
        </Dialog>
      </Card>
    </div>
  );
}

BrowseElectionPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  userRoles: PropTypes.arrayOf(PropTypes.string),
  // model
  polls: PropTypes.array,
  pollQueryString: PropTypes.string,
  candidates: PropTypes.array,
  selectedCandidates: PropTypes.array,
  pollInDialog: PropTypes.object,
  // validation
  isVoteDialogOpen: PropTypes.bool,

  // actions
  onChangePollQueryString: PropTypes.func,
  onFetchAllPolls: PropTypes.func,
  onSelectPollRow: PropTypes.func,

  onSelectDialogCandidate: PropTypes.func,
  onClosePollDetails: PropTypes.func,
  onSendVote: PropTypes.func,
  onEditPoll: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectUserIsAuthenticated(),
  userRoles: makeSelectUserRoles(),
  // model
  polls: makeSelectPolls(),
  pollQueryString: makeSelectPollQueryString(),
  candidates: makeSelectCandidates(),
  selectedCandidates: makeSelectSelectedCandidates(),
  pollInDialog: makeSelectPollInDialog(),
  // validation
  isVoteDialogOpen: makeSelectIsVoteDialogOpen(),

});

export function mapDispatchToProps(dispatch) {
  return {
    onChangePollQueryString: (evt) => dispatch(changePollQueryString(evt.target.value)),
    onFetchAllPolls: () => dispatch(fetchAllPolls()),

    onSelectPollRow: (poll) => dispatch(selectPollRow(poll)),
    onSelectDialogCandidate: (checked, userId) => dispatch(changeSelectDialogCandidate(checked, userId)),
    onClosePollDetails: () => dispatch(closePollDetails()),
    onSendVote: () => dispatch(sendVotes()),
    onEditPoll: (pollId) => dispatch(push('/elections/update/'+pollId)),
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
)(BrowseElectionPage);

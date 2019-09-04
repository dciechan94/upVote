import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { push } from 'connected-react-router/immutable';

import { Button, ButtonGroup, Menu, MenuItem, Popover, Position } from '@blueprintjs/core';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  makeSelectUserIsAuthenticated,
  makeSelectUserRoles,
} from 'containers/App/selectors'

const key = 'menuBar';

export function MenuBar ({
  intl,
  isAuthenticated,
  userRoles,

  onClickCreatePoll,
  onClickBrowseActualPolls,
  onClickBrowseArchivePolls,
  onClickGenerateTokens,
  onClickManageUsers,
  onClickManagePolls,
  onClickTermsOfService,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const {formatMessage} = intl;

  //<MenuItem icon="database" text={formatMessage(messages.archivedVotings)} onClick={onClickBrowseArchivePolls}/>

  const votingMenu = (
	<Menu>
	  <MenuItem icon="search" text={formatMessage(messages.actualVotings)} onClick={onClickBrowseActualPolls}/>
	</Menu>
  );

  // <MenuItem icon="helper-management" text={formatMessage(messages.managePolls)} onClick={onClickManagePolls}/>
  const administrationPolls = (
	<Menu>
	  <MenuItem icon="add" text={formatMessage(messages.createPoll)} onClick={onClickCreatePoll}/>
	</Menu>
  );

  //  <MenuItem icon="helper-management" text={formatMessage(messages.manageUsers)} onClick={onClickManageUsers}/>
  const administrationUsers = (
    <Menu>
      <MenuItem icon="key" text={formatMessage(messages.generateTokens)} onClick={onClickGenerateTokens}/>
    </Menu>
    );

  return (
	  <div>
      <ButtonGroup style={{ paddingTop: 5, paddingBottom: 5 }} minimal large>

        {isAuthenticated && userRoles.includes("UPV_User") ?
          <Popover content={votingMenu} position={Position.BOTTOM}>
            <Button icon="form">{formatMessage(messages.voteMainMenu)}</Button>
          </Popover> : null }


        {isAuthenticated && userRoles.includes("UPV_Administrator") ?
          <Popover content={administrationUsers} position={Position.BOTTOM}>
            <Button icon="people">{formatMessage(messages.usersMainMenu)}</Button>
          </Popover> : null }

        {isAuthenticated && userRoles.includes("UPV_Administrator") ?
          <Popover content={administrationPolls} position={Position.BOTTOM}>
            <Button icon="applications">{formatMessage(messages.pollsMainMenu)}</Button>
          </Popover> : null }

        <Button icon="manual" onClick={onClickTermsOfService}>
          {formatMessage(messages.termsOfService)}
        </Button>

      </ButtonGroup>
	  </div>
  );
}

MenuBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  userRoles: PropTypes.arrayOf(PropTypes.string),

  onClickCreatePoll: PropTypes.func,
  onClickBrowseActualPolls: PropTypes.func,
  onClickBrowseArchivePolls: PropTypes.func,
  onClickGenerateTokens: PropTypes.func,
  onClickManageUsers: PropTypes.func,
  onClickManagePolls: PropTypes.func,
  onClickTermsOfService: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectUserIsAuthenticated(),
  userRoles: makeSelectUserRoles(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onClickCreatePoll: () => dispatch(push('/elections/create')),
    onClickBrowseActualPolls: () => dispatch(push('/elections/browse/actual')),
    onClickBrowseArchivePolls: () => dispatch(push('/elections/browse/archive')),
    onClickGenerateTokens: () => dispatch(push('/tokens')),
    onClickManageUsers: () => dispatch(push('/users/manage')),
    onClickManagePolls: () => dispatch(push('/elections/manage')),
    onClickTermsOfService: () => dispatch(push('/terms')),
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
)(MenuBar);

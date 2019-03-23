/**
 *
 * MenuBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router/immutable';

import { Button, ButtonGroup, Menu, MenuDivider, MenuItem, Popover, Position } from "@blueprintjs/core";

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMenuBar from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class MenuBar extends React.Component {

  render() {
    const {formatMessage} = this.props.intl;
    const votingMenu = (
      <Menu>
          <MenuItem icon="search" text={formatMessage(messages.actualVotings)} onClick={this.props.onClickBrowseActualPolls}/>
          <MenuItem icon="database" text={formatMessage(messages.archivedVotings)} onClick={this.props.onClickBrowseArchivePolls}/>
      </Menu>
    );

    const administrationMenu = (
      <Menu>
          <MenuItem icon="applications" text={formatMessage(messages.pollsSubmenu)}>
              <MenuItem icon="add" text={formatMessage(messages.createPoll)} onClick={this.props.onClickCreatePoll}/>
              <MenuItem icon="helper-management" text={formatMessage(messages.managePolls)} onClick={this.props.onClickManagePolls}/>
          </MenuItem>
          <MenuDivider />
          <MenuItem icon="people" text={formatMessage(messages.usersSubmenu)}>
              <MenuItem icon="key" text={formatMessage(messages.generateTokens)} onClick={this.props.onClickGenerateTokens}/>
              <MenuItem icon="helper-management" text={formatMessage(messages.manageUsers)} onClick={this.props.onClickManageUsers}/>
          </MenuItem>
      </Menu>
    );

    return (
      <div>
        <ButtonGroup style={{ paddingTop: 5, paddingBottom: 5 }} minimal large>

          <Popover content={votingMenu} position={Position.BOTTOM}>
            <Button icon="form">{"Voting"}</Button>
          </Popover>
          <Popover content={administrationMenu} position={Position.BOTTOM}>
            <Button icon="wrench">{"Administration"}</Button>
          </Popover>

        </ButtonGroup>
      </div>
    );
  }
}

MenuBar.propTypes = {
  onClickCreatePoll: PropTypes.func,
  onClickBrowseActualPolls: PropTypes.func,
  onClickBrowseArchivePolls: PropTypes.func,
  onClickGenerateTokens: PropTypes.func,
  onClickManageUsers: PropTypes.func,
  onClickManagePolls: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  menuBar: makeSelectMenuBar(),
});

function mapDispatchToProps(dispatch) {
  return {
    onClickCreatePoll: () => dispatch(push('/elections/create')),
    onClickBrowseActualPolls: () => dispatch(push('/browse/elections/actual')),
    onClickBrowseArchivePolls: () => dispatch(push('/browse/elections/archive')),
    onClickGenerateTokens: () => dispatch(push('/tokens')),
    onClickManageUsers: () => dispatch(push('/users/manage')),
    onClickManagePolls: () => dispatch(push('/elections/manage')),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'menuBar', reducer });
const withSaga = injectSaga({ key: 'menuBar', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl,
)(MenuBar);

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router/immutable';

import { postLogout } from './actions';

import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";

import { makeSelectUserFirstName,
  makeSelectUserLastName,
  makeSelectUserIsAuthenticated
} from 'containers/App/selectors'

import messages from './messages';

function Header({
  intl,
  onClickSignIn,
  onClickSignOut,
  onClickProfileSettings,
  firstName,
  lastName,
  isAuthenticated,
}) {

  const {formatMessage} = intl;

  const signInButton = (
    <Button className={Classes.MINIMAL} icon="log-in" text={formatMessage(messages.signIn)} onClick={onClickSignIn} />
  );

  const profileButton = (
    <Button className={Classes.MINIMAL} icon="person" text={firstName + " " +lastName}  onClick={onClickProfileSettings} />
  );


  const signOutButton = (
    <Button className={Classes.MINIMAL} icon="power" text={formatMessage(messages.signOut)} onClick={onClickSignOut} />
  );

  return (
    <div>
        <Navbar className="bp3-dark">
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>{formatMessage(messages.pedagogicalUniversity)}</NavbarHeading>
            <NavbarHeading><b>{formatMessage(messages.voteApp)}</b></NavbarHeading>
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
            {!isAuthenticated ? signInButton : null}
            {isAuthenticated ? profileButton : null}
            {isAuthenticated ? signOutButton : null}
          </NavbarGroup>
        </Navbar>
      </div>
  );
}

Header.propTypes = {
  onClickSignIn: PropTypes.func,
  onClickSignOut: PropTypes.func,
  onClickProfileSettings: PropTypes.func,

  firstName: PropTypes.string,
  lastName: PropTypes.string,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  firstName: makeSelectUserFirstName(),
  lastName: makeSelectUserLastName(),
  isAuthenticated: makeSelectUserIsAuthenticated(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onClickSignIn: () => dispatch(push('/signin')),
    onClickSignOut: () => { dispatch(postLogout()); dispatch(push('/signin')) },
    onClickProfileSettings: () => dispatch(push('/profile')),
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
)(Header);

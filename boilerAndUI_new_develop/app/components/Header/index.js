import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { push } from 'connected-react-router/immutable';
import { createStructuredSelector } from 'reselect';

import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    const {formatMessage} = this.props.intl;

    return (
      <div>
        <Navbar className="bp3-dark">
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>{formatMessage(messages.pedagogicalUniversity)}</NavbarHeading>
            <NavbarHeading><b>{formatMessage(messages.voteApp)}</b></NavbarHeading>
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
            <Button className={Classes.MINIMAL} icon="log-in" text={formatMessage(messages.signIn)} onClick={this.props.onClickSignIn} />
            <Button className={Classes.MINIMAL} icon="person" text="Dariusz Ciechanowski"  onClick={this.props.onClickProfileSettings} />
            <Button className={Classes.MINIMAL} icon="power" text={formatMessage(messages.signOut)}  onClick={this.props.onClickSignOut} />
          </NavbarGroup>
        </Navbar>
      </div>
    );
  }

}

Header.propTypes = {
  onClickSignIn: PropTypes.func,
  onClickSignOut: PropTypes.func,
  onClickProfileSettings: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
});

export function mapDispatchToProps(dispatch) {
  return {
    onClickSignIn: () => dispatch(push('/signin')),
    onClickSignOut: () => dispatch(push('/signin')),
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
)(Header);

/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Card } from "@blueprintjs/core";

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { changeEmail, changePassword, postLogin } from './actions';
import { makeSelectEmail, makeSelectPassword, makeSelectIsEmailValid, makeSelectIsPasswordValid, makeSelectSysFirstName } from './selectors'
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import LoginForm from 'components/LoginForm';

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.PureComponent {
  render() {
    return (
      <Card style={{margin: "auto", width: 400}}>
        <Helmet>
          <title>Sign In</title>
          <meta name="description" content="Fill in the login form to enter the system." />
        </Helmet>

        <LoginForm
          email={this.props.email}
          password={this.props.password}

          isEmailValid={this.props.isEmailValid}
          isPasswordValid={this.props.isPasswordValid}

          onChangeEmail={this.props.onChangeEmail}
          onChangePassword={this.props.onChangePassword}
          onPostLogin={this.props.onPostLogin}
        />
      </Card>
    );
  }
}

LoginPage.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,

  isEmailValid: PropTypes.bool,
  isPasswordValid: PropTypes.bool,

  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  onPostLogin: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  password: makeSelectPassword(),

  isEmailValid: makeSelectIsEmailValid(),
  isPasswordValid: makeSelectIsPasswordValid(),

  sysFirstName: makeSelectSysFirstName(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeEmail: (evt) => dispatch(changeEmail(evt.target.value)),
    onChangePassword: (evt) => dispatch(changePassword(evt.target.value)),
    onPostLogin: () => dispatch(postLogin()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);

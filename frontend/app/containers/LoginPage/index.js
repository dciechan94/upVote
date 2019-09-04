import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { push } from 'connected-react-router/immutable';

import { Card } from '@blueprintjs/core';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { changeEmail, changePassword, postLogin, clearLoginPageData } from './actions';
import { makeSelectEmail, makeSelectPassword, makeSelectIsEmailValid, makeSelectIsPasswordValid } from './selectors'
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import LoginForm from 'components/LoginForm';

const key = 'login';

export function LoginPage({
  intl,
  email,
  password,
  isEmailValid,
  isPasswordValid,
  onChangeEmail,
  onChangePassword,
  onPostLogin,
  onRedirectToRegistrationPage,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const {formatMessage} = intl;

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
        <Card style={{margin: "auto", width: 400}}>
          <LoginForm
            email={email}
            password={password}

            isEmailValid={isEmailValid}
            isPasswordValid={isPasswordValid}

            onChangeEmail={onChangeEmail}
            onChangePassword={onChangePassword}
            onPostLogin={onPostLogin}
            onRedirectToRegistrationPage={onRedirectToRegistrationPage}
          />
        </Card>
      </Card>
    </div>
  );
}

LoginPage.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,

  isEmailValid: PropTypes.bool,
  isPasswordValid: PropTypes.bool,

  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  onPostLogin: PropTypes.func,
  onRedirectToRegistrationPage: PropTypes.func,
};


const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  password: makeSelectPassword(),

  isEmailValid: makeSelectIsEmailValid(),
  isPasswordValid: makeSelectIsPasswordValid(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeEmail: (evt) => dispatch(changeEmail(evt.target.value)),
    onChangePassword: (evt) => dispatch(changePassword(evt.target.value)),
    onPostLogin: () => dispatch(postLogin()),
    onRedirectToRegistrationPage: () => { dispatch(clearLoginPageData()); dispatch(push('/signup'))},
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
)(LoginPage);

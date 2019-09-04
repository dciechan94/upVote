import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import { Card } from '@blueprintjs/core';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { changeRegistrationCode, changeEmail, changeFirstName, changeLastName, changePassword, changePasswordRepeat,
  createNewUser, closeRegistrationResultModal, changeTermsCheckBoxValue } from './actions';
import { makeSelectRegistrationCode, makeSelectEmail, makeSelectFirstName, makeSelectLastName, makeSelectPassword,
  makeSelectPasswordRepeat, makeSelectIsRegistrationCodeValid, makeSelectIsEmailValid, makeSelectIsFirstNameValid,
  makeSelectIsLastNameValid, makeSelectIsPasswordValid, makeSelectIsPasswordRepeatValid, makeSelectShowRegistrationResultModal,
  makeSelectIsRegistrationResultError, makeSelectRegistrationResultMessage, makeSelectTermsCheckBoxValue } from './selectors'
import RegistrationForm from 'components/RegistrationForm';

const key = 'register';

export function RegisterPage({
  intl,
  registrationCode,
  email,
  firstName,
  lastName,
  password,
  passwordRepeat,
  isRegistrationCodeValid,
  isEmailValid,
  isFirstNameValid,
  isLastNameValid,
  isPasswordValid,
  isPasswordRepeatValid,
  termsCheckBoxValue,
  showRegistrationResultModal,
  isRegistrationResultError,
  registrationResultMessage,

  onChangeRegistrationCode,
  onChangeEmail,
  onChangeFirstName,
  onChangeLastName,
  onChangePassword,
  onChangePasswordRepeat,
  onTermsCheckBoxChange,
  onCreateNewUser,

  onCloseRegistrationResultModal,

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
          <RegistrationForm
            registrationCode={registrationCode}
            email={email}
            firstName={firstName}
            lastName={lastName}
            password={password}
            passwordRepeat={passwordRepeat}

            isRegistrationCodeValid={isRegistrationCodeValid}
            isEmailValid={isEmailValid}
            isFirstNameValid={isFirstNameValid}
            isLastNameValid={isLastNameValid}
            isPasswordValid={isPasswordValid}
            isPasswordRepeatValid={isPasswordRepeatValid}
            termsCheckBoxValue={termsCheckBoxValue}

            onChangeRegistrationCode={onChangeRegistrationCode}
            onChangeEmail={onChangeEmail}
            onChangeFirstName={onChangeFirstName}
            onChangeLastName={onChangeLastName}
            onChangePassword={onChangePassword}
            onChangePasswordRepeat={onChangePasswordRepeat}
            onTermsCheckBoxChange={onTermsCheckBoxChange}
            onCreateNewUser={onCreateNewUser}

            showRegistrationResultModal={showRegistrationResultModal}
            isRegistrationResultError={isRegistrationResultError}
            registrationResultMessage={registrationResultMessage}

            onCloseRegistrationResultModal={onCloseRegistrationResultModal}
          />
        </Card>
      </Card>
    </div>
  );
}

RegisterPage.propTypes = {
  registrationCode: PropTypes.string,
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  password: PropTypes.string,
  passwordRepeat: PropTypes.string,

  isRegistrationCodeValid: PropTypes.bool,
  isEmailValid: PropTypes.bool,
  isFirstNameValid: PropTypes.bool,
  isLastNameValid: PropTypes.bool,
  isPasswordValid: PropTypes.bool,
  isPasswordRepeatValid: PropTypes.bool,
  termsCheckBoxValue: PropTypes.bool,

  onChangeRegistrationCode: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangeFirstName: PropTypes.func,
  onChangeLastName: PropTypes.func,
  onChangePassword: PropTypes.func,
  onChangePasswordRepeat: PropTypes.func,
  onTermsCheckBoxChange: PropTypes.func,
  onCreateNewUser: PropTypes.func,

  showRegistrationResultModal: PropTypes.bool,
  isRegistrationResultError: PropTypes.bool,
  registrationResultMessage: PropTypes.array,

  onCloseRegistrationResultModal: PropTypes.func,
};


const mapStateToProps = createStructuredSelector({
  registrationCode: makeSelectRegistrationCode(),
  email: makeSelectEmail(),
  firstName: makeSelectFirstName(),
  lastName: makeSelectLastName(),
  password: makeSelectPassword(),
  passwordRepeat: makeSelectPasswordRepeat(),

  isRegistrationCodeValid: makeSelectIsRegistrationCodeValid(),
  isEmailValid: makeSelectIsEmailValid(),
  isFirstNameValid: makeSelectIsFirstNameValid(),
  isLastNameValid: makeSelectIsLastNameValid(),
  isPasswordValid: makeSelectIsPasswordValid(),
  isPasswordRepeatValid: makeSelectIsPasswordRepeatValid(),
  termsCheckBoxValue: makeSelectTermsCheckBoxValue(),

  showRegistrationResultModal: makeSelectShowRegistrationResultModal(),
  isRegistrationResultError: makeSelectIsRegistrationResultError(),
  registrationResultMessage: makeSelectRegistrationResultMessage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeRegistrationCode: (evt) => dispatch(changeRegistrationCode(evt.target.value)),
    onChangeEmail: (evt) => dispatch(changeEmail(evt.target.value)),
    onChangeFirstName: (evt) => dispatch(changeFirstName(evt.target.value)),
    onChangeLastName: (evt) => dispatch(changeLastName(evt.target.value)),
    onChangePassword: (evt) => dispatch(changePassword(evt.target.value)),
    onChangePasswordRepeat: (evt) => dispatch(changePasswordRepeat(evt.target.value)),
    onTermsCheckBoxChange: () => dispatch(changeTermsCheckBoxValue()),
    onCreateNewUser: () => dispatch(createNewUser()),

    onCloseRegistrationResultModal: () => dispatch(closeRegistrationResultModal()),
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
)(RegisterPage);

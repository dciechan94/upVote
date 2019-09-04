import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import {
  Button,
  Card,
  FormGroup,
  H5,
  InputGroup,
} from '@blueprintjs/core';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { changeEmail, changeFirstName, changeLastName, changeUsername, changePassword, changePasswordRepeat,
  fetchUserData, editProfile } from './actions';
import { makeSelectEmail, makeSelectFirstName, makeSelectLastName, makeSelectUsername, makeSelectPassword,
  makeSelectPasswordRepeat } from './selectors'


const key = 'profile';

export function ProfilePage({
  intl,
  // model
  email,
  firstName,
  lastName,
  password,
  passwordRepeat,
  username,

  // validation

  // actions
  onChangeEmail,
  onChangeFirstName,
  onChangeLastName,
  onChangeUsername,
  onChangePassword,
  onChangePasswordRepeat,
  onFetchUserData,
  onEditProfile,

}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    onFetchUserData()
  }, []);

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
        <H5>{formatMessage(messages.userData)}</H5> <br></br>

        <FormGroup
          label={formatMessage(messages.email)}
          labelFor="email-input"
        >
          <InputGroup disabled
            id="email-input"
            onChange={onChangeEmail}
            value={email}
          />
        </FormGroup>

        <FormGroup
          label={formatMessage(messages.firstName)}
          labelFor="firstName-input"
        >
          <InputGroup
            id="firstName-input"
            onChange={onChangeFirstName}
            value={firstName}
          />
        </FormGroup>

        <FormGroup
          label={formatMessage(messages.lastName)}
          labelFor="lastName-input"
        >
          <InputGroup
            id="lastName-input"
            onChange={onChangeLastName}
            value={lastName}
          />
        </FormGroup>

        <FormGroup
          label={formatMessage(messages.username)}
          labelFor="username-input"
        >
          <InputGroup
            id="username-input"
            onChange={onChangeUsername}
            value={username}
          />
        </FormGroup>

        <FormGroup
          label={formatMessage(messages.password)}
          labelFor="password-input"
        >
          <InputGroup
            id="password-input"
            type="password"
            onChange={onChangePassword}
          />
        </FormGroup>

        <FormGroup
          label={formatMessage(messages.passwordRepeat)}
          labelFor="passwordRepeat-input"
        >
          <InputGroup
            id="passwordRepeat-input"
            type="password"
            onChange={onChangePasswordRepeat}
          />
        </FormGroup>

        <Button text={formatMessage(messages.applyEditButtonText)} onClick={onEditProfile}/>
      </Card>
    </div>
  );
}

ProfilePage.propTypes = {
  // model
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  password: PropTypes.string,
  passwordRepeat: PropTypes.string,
  username: PropTypes.string,
  // validation

  // actions
  onFetchUserData: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangeFirstName: PropTypes.func,
  onChangeLastName: PropTypes.func,
  onChangeUsername: PropTypes.func,
  onChangePassword: PropTypes.func,
  onChangePasswordRepeat: PropTypes.func,
  onEditProfile: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // model
  email: makeSelectEmail(),
  firstName: makeSelectFirstName(),
  lastName: makeSelectLastName(),
  username: makeSelectUsername(),
  password: makeSelectPassword(),
  passwordRepeat: makeSelectPasswordRepeat(),
  // validation

});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeEmail: (evt) => dispatch(changeEmail(evt.target.value)),
    onChangeFirstName: (evt) => dispatch(changeFirstName(evt.target.value)),
    onChangeLastName: (evt) => dispatch(changeLastName(evt.target.value)),
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onChangePassword: (evt) => dispatch(changePassword(evt.target.value)),
    onChangePasswordRepeat: (evt) => dispatch(changePasswordRepeat(evt.target.value)),
    onEditProfile: () => dispatch(editProfile()),
    onFetchUserData: () => dispatch(fetchUserData()),
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
)(ProfilePage);

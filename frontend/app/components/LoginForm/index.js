import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import {
  Button,
  FormGroup,
  InputGroup,
  Intent,
  Text,
  Tooltip,
} from '@blueprintjs/core';

import messages from './messages';


function LoginForm ({
  intl,
  isEmailValid,
  isPasswordValid,
  onChangeEmail,
  onChangePassword,
  onPostLogin,
  onRedirectToRegistrationPage,
}) {
    const {formatMessage} = intl;

    const lockButton = (
      <Tooltip content={formatMessage(messages.lockButtonToolTip)}>
          <Button
              icon="lock"
              intent={Intent.WARNING}
              minimal={true}
              onClick={()=>{}}
          />
      </Tooltip>
    );

    return (
      <div>
        <FormGroup
          label={formatMessage(messages.emailLoginFormLabel)}
          labelFor="text-input"
        >
          <InputGroup
            id="text-input"
            placeholder={formatMessage(messages.emailLoginFormInputPlaceholder)}
            intent={isEmailValid ? Intent.NONE : Intent.WARNING}
            onChange={onChangeEmail}
          />
        </FormGroup>

        <FormGroup
          label={formatMessage(messages.passwordFormLabel)}
          labelFor="password-input"
        >
          <InputGroup
            id="password-input"
            placeholder={formatMessage(messages.passwordFormInputPlaceholder)}
            rightElement={lockButton}
            intent={isPasswordValid ? Intent.NONE : Intent.WARNING}
            type="password"
            onChange={onChangePassword}
          />
        </FormGroup>

        <Button text={formatMessage(messages.loginButtonText)} onClick={onPostLogin} />
        <Button style={{align: "right"}} onClick={onRedirectToRegistrationPage} minimal>
          {formatMessage(messages.createAccount)}
        </Button>
      </div>
    );
}

LoginForm.propTypes = {
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  onPostLogin: PropTypes.func,
  onRedirectToRegistrationPage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
});

export function mapDispatchToProps(dispatch) {
  return {

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
)(LoginForm);




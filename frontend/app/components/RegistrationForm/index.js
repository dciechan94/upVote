import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import {
  Alignment,
  Button,
  Checkbox,
  Classes,
  Dialog,
  FormGroup,
  InputGroup,
  Intent,
  Tooltip,
} from "@blueprintjs/core";

import messages from './messages';


function RegistrationForm({
  intl,
  isRegistrationCodeValid,
  isEmailValid,
  isFirstNameValid,
  isLastNameValid,
  isPasswordValid,
  isPasswordRepeatValid,
  termsCheckBoxValue,
  isRegistrationResultError,

  showRegistrationResultModal,
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
        label={formatMessage(messages.registrationCode)}
        labelFor="registrationCode-input"
        labelInfo={formatMessage(messages.requiredTip)}
      >
        <InputGroup
          id="registrationCode-input"
          intent={isRegistrationCodeValid ? Intent.NONE : Intent.WARNING}
          onChange={onChangeRegistrationCode}
        />
      </FormGroup>

      <FormGroup
        label={formatMessage(messages.email)}
        labelFor="email-input"
        labelInfo={formatMessage(messages.requiredTip)}
      >
        <InputGroup
          id="email-input"
          intent={isEmailValid ? Intent.NONE : Intent.WARNING}
          onChange={onChangeEmail}
        />
      </FormGroup>

      <FormGroup
        label={formatMessage(messages.firstName)}
        labelFor="firstName-input"
      >
        <InputGroup
          id="firstName-input"
          intent={isFirstNameValid ? Intent.NONE : Intent.WARNING}
          onChange={onChangeFirstName}
        />
      </FormGroup>

      <FormGroup
        label={formatMessage(messages.lastName)}
        labelFor="lastName-input"
      >
        <InputGroup
          id="lastName-input"
          intent={isLastNameValid ? Intent.NONE : Intent.WARNING}
          onChange={onChangeLastName}
        />
      </FormGroup>

      <FormGroup
        label={formatMessage(messages.password)}
        labelFor="password-input"
        labelInfo={formatMessage(messages.requiredTip)}
      >
        <InputGroup
          id="password-input"
          rightElement={lockButton}
          type="password"
          intent={isPasswordValid ? Intent.NONE : Intent.WARNING}
          onChange={onChangePassword}
        />
      </FormGroup>

      <FormGroup
        label={formatMessage(messages.passwordRepeat)}
        labelFor="passwordRepeat-input"
        labelInfo={formatMessage(messages.requiredTip)}
      >
        <InputGroup
          id="passwordRepeat-input"
          rightElement={lockButton}
          type="password"
          intent={isPasswordRepeatValid ? Intent.NONE : Intent.WARNING}
          onChange={onChangePasswordRepeat}
        />
      </FormGroup>


      <Checkbox alignIndicator={Alignment.LEFT} label={formatMessage(messages.termsOfServiceAccept)}
        onClick={onTermsCheckBoxChange} checked={termsCheckBoxValue}/>

      <Button text={formatMessage(messages.registerButtonText)} onClick={onCreateNewUser} disabled={!termsCheckBoxValue}/>

      <Dialog
        icon={isRegistrationResultError ? "issue" : "info-sign" }
        onClose={onCloseRegistrationResultModal}
        title={isRegistrationResultError ? "Verify your data" : "Registration completed"}
        isOpen={showRegistrationResultModal}
      >
        <div className={Classes.DIALOG_BODY}>
            <p>
                <strong>
                  {registrationResultMessage}
                </strong>
            </p>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={onCloseRegistrationResultModal}>OK</Button>
            </div>
        </div>
      </Dialog>

    </div>
  );
}


RegistrationForm.propTypes = {
  isRegistrationCodeValid: PropTypes.bool,
  isEmailValid: PropTypes.bool,
  isFirstNameValid: PropTypes.bool,
  isLastNameValid: PropTypes.bool,
  isPasswordValid: PropTypes.bool,
  isPasswordRepeatValid: PropTypes.bool,
  isRegistrationResultError: PropTypes.bool,
  termsCheckBoxValue: PropTypes.bool,

  showRegistrationResultModal: PropTypes.bool,

  onChangeRegistrationCode: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangeFirstName: PropTypes.func,
  onChangeLastName: PropTypes.func,
  onChangePassword: PropTypes.func,
  onChangePasswordRepeat: PropTypes.func,
  onTermsCheckBoxChange: PropTypes.func,
  onCreateNewUser: PropTypes.func,
  onCloseRegistrationResultModal: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
});

export function mapDispatchToProps(dispatch) {
  return {
    // onChangeRegistrationCode: (evt) => dispatch(changeRegistrationCode(evt.target.value)),
    // onChangeEmail: (evt) => dispatch(changeEmail(evt.target.value)),
    // onChangeFirstName: (evt) => dispatch(changeFirstName(evt.target.value)),
    // onChangeLastName: (evt) => dispatch(changeLastName(evt.target.value)),
    // onChangePassword: (evt) => dispatch(changePassword(evt.target.value)),
    // onChangePasswordRepeat: (evt) => dispatch(changePasswordRepeat(evt.target.value)),
    // onCreateNewUser: () => dispatch(createNewUser()),

    // onCloseRegistrationResultModal: () => dispatch(closeRegistrationResultModal()),
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
)(RegistrationForm);

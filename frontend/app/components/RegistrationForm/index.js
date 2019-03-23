/**
 *
 * RegistrationForm
 *
 */

import React from 'react';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
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

/* eslint-disable react/prefer-stateless-function */
class RegistrationForm extends React.PureComponent {
  render() {
    const {formatMessage} = this.props.intl;
    const lockButton = (
      <Tooltip content={`${true ? "Hide" : "Show"} Password`}>
          <Button
              icon={false ? "unlock" : "lock"}
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
          labelInfo="(required)"
        >
          <InputGroup
            id="registrationCode-input"
            intent={this.props.isRegistrationCodeValid ? Intent.NONE : Intent.WARNING}
            onChange={this.props.onChangeRegistrationCode}
          />
        </FormGroup>

        <FormGroup
          label={formatMessage(messages.email)}
          labelFor="email-input"
          labelInfo="(required)"
        >
          <InputGroup
            id="email-input"
            intent={this.props.isEmailValid ? Intent.NONE : Intent.WARNING}
            onChange={this.props.onChangeEmail}
          />
        </FormGroup>

        <FormGroup
          label={formatMessage(messages.firstName)}
          labelFor="firstName-input"
        >
          <InputGroup
            id="firstName-input"
            intent={this.props.isFirstNameValid ? Intent.NONE : Intent.WARNING}
            onChange={this.props.onChangeFirstName}
          />
        </FormGroup>

        <FormGroup
          label={formatMessage(messages.lastName)}
          labelFor="lastName-input"
        >
          <InputGroup
            id="lastName-input"
            intent={this.props.isLastNameValid ? Intent.NONE : Intent.WARNING}
            onChange={this.props.onChangeLastName}
          />
        </FormGroup>

        <FormGroup
          label={formatMessage(messages.password)}
          labelFor="password-input"
          labelInfo="(required)"
        >
          <InputGroup
            id="password-input"
            rightElement={lockButton}
            type="password"
            intent={this.props.isPasswordValid ? Intent.NONE : Intent.WARNING}
            onChange={this.props.onChangePassword}
          />
        </FormGroup>

        <FormGroup
          label={formatMessage(messages.passwordRepeat)}
          labelFor="passwordRepeat-input"
          labelInfo="(required)"
        >
          <InputGroup
            id="passwordRepeat-input"
            rightElement={lockButton}
            type="password"
            intent={this.props.isPasswordRepeatValid ? Intent.NONE : Intent.WARNING}
            onChange={this.props.onChangePasswordRepeat}
          />
        </FormGroup>


        <Checkbox alignIndicator={Alignment.LEFT} label="I agree and accept the Terms of Service." />

        <Button text={formatMessage(messages.registerButtonText)} onClick={this.props.onCreateNewUser} />

        <Dialog
          icon={this.props.isRegistrationResultError ? "issue" : "info-sign" }
          onClose={this.props.onCloseRegistrationResultModal}
          title={this.props.isRegistrationResultError ? "Verify your data" : "Registration completed"}
          isOpen={this.props.showRegistrationResultModal}
        >
          <div className={Classes.DIALOG_BODY}>
              <p>
                  <strong>
                      You have successfully created a new account. You can now Sign In.
                  </strong>
              </p>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button onClick={this.props.onCloseRegistrationResultModal}>OK</Button>
              </div>
          </div>
        </Dialog>

      </div>
    );
  }
}

RegistrationForm.propTypes = {};

export default compose(
  injectIntl,
)(RegistrationForm);

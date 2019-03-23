import React from 'react';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

import {
  Button,
  FormGroup,
  InputGroup,
  Intent,
  Text,
  Tooltip,
} from "@blueprintjs/core";

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class LoginForm extends React.PureComponent {
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
          label={formatMessage(messages.email)}
          labelFor="text-input"
        >
          <InputGroup
            id="text-input"
            placeholder="Enter your email..."
            intent={Intent.NONE}
          />
        </FormGroup>

        <FormGroup
          label={formatMessage(messages.password)}
          labelFor="password-input"
        >
          <InputGroup
            id="password-input"
            placeholder="Enter your password..."
            rightElement={lockButton}
            type="password"
            onChange={this.props.onChangePassword}
          />
        </FormGroup>
        <Text style={{align: "right"}}>
          {formatMessage(messages.createAccount)}
        </Text>

        <Button text={formatMessage(messages.loginButtonText)} onClick={this.props.onPostLogin} />
      </div>
    );
  }
}

LoginForm.propTypes = {};

export default compose(
  injectIntl,
)(LoginForm);




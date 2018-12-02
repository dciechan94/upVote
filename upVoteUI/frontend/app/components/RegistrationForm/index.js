import React from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';

import { Tile, TextInput, Button, Modal } from 'carbon-components-react';

const TagListWrapper = styled.div`
  padding-bottom: 1rem;
`;

class RegistrationForm extends React.Component {

  render() {

    const {formatMessage} = this.props.intl;

    return (
      <Tile>
        <TagListWrapper>
          <TextInput
            id="test2"
            labelText={formatMessage({id:"upvote.components.RegistrationForm.registrationCode"})}
            required
            hideLabel={false}
            light={false}
            
            invalid={!this.props.isRegistrationCodeValid}
            invalidText="A valid value is required"
            value={this.props.registrationCode}
            
            onChange={this.props.onChangeRegistrationCode}
          />
        </TagListWrapper>
      
        <TagListWrapper>
          <TextInput
            id="test3"
            labelText={formatMessage({id:"upvote.components.RegistrationForm.email"})}
            required
            hideLabel={false}
            light={false}
  
            invalid={!this.props.isEmailValid}
            invalidText="A valid value is required"
            value={this.props.email}
  
            onChange={this.props.onChangeEmail}
          />
        </TagListWrapper>
      
        <TagListWrapper>
          <TextInput
            id="test4"
            labelText={formatMessage({id:"upvote.components.RegistrationForm.firstName"})}
            required
            hideLabel={false}
            light={false}
            
            invalid={!this.props.isFirstNameValid}
            invalidText="A valid value is required"
            value={this.props.firstName}
            
            onChange={this.props.onChangeFirstName}
          />
        </TagListWrapper>
      
        <TagListWrapper>
          <TextInput
            id="test5"
            labelText={formatMessage({id:"upvote.components.RegistrationForm.lastName"})}
            required
            hideLabel={false}
            light={false}
            
            invalid={!this.props.isLastNameValid}
            invalidText="A valid value is required"
            value={this.props.lastName}
            
            onChange={this.props.onChangeLastName}
          />
        </TagListWrapper>
      
        <TagListWrapper>
          <TextInput
            id="password"
            labelText={formatMessage({id:"upvote.components.RegistrationForm.password"})}
            required
            type="password"
            hideLabel={false}
            light={false}
            
            invalid={!this.props.isPasswordValid}
            invalidText="Your password must be at least 6 characters as well as contain at least one uppercase, one lowercase, and one number."
            value={this.props.password}
            
            onChange={this.props.onChangePassword}
          />
        </TagListWrapper>
      
        <TagListWrapper>
          <TextInput
            id="password6"
            labelText={formatMessage({id:"upvote.components.RegistrationForm.passwordRepeat"})}
            required
            type="password"
            hideLabel={false}
            light={false}
            
            invalid={!this.props.isPasswordRepeatValid}
            invalidText="Your password must be at least 6 characters as well as contain at least one uppercase, one lowercase, and one number."
            value={this.props.passwordRepeat}
            
            onChange={this.props.onChangePasswordRepeat}
          />
        </TagListWrapper>
      
        <TagListWrapper>
          <Button  onClick={this.props.onCreateNewUser} onFocus={()=>{}}>
            {formatMessage({id:"upvote.components.RegistrationForm.registerButtonText"})}
          </Button>
        </TagListWrapper>

        <Modal
          open={this.props.showRegistrationResultModal}
          danger={this.props.isRegistrationResultError}
          modalHeading={formatMessage({id: "upvote.components.RegistrationForm.modalHeading"})}
          modalLabel={formatMessage({id: "upvote.components.RegistrationForm.modalLabel"})}
          primaryButtonText={formatMessage({id: "BUTTON_LABEL_OK"})}
          secondaryButtonText={formatMessage({id: "BUTTON_LABEL_CANCEL"})}
          onRequestClose={this.props.onCloseRegistrationResultModal}
          onRequestSubmit={this.props.onCloseRegistrationResultModal}
          onSecondarySubmit={this.props.onCloseRegistrationResultModal}>
        
          {this.props.registrationResultMessage.map(message => 
            <p key="1" className="bx--modal-content__text">
              {formatMessage({id: message})}
            </p> 
          )}
        </Modal>
      </Tile>
    );
  }

}

export default injectIntl(RegistrationForm);

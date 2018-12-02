import React from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';

import { Tile, TextInput, Button, Modal } from 'carbon-components-react';

const TagListWrapper = styled.div`
  padding-bottom: 1rem;
`;

class LoginForm extends React.Component {

  render() {

    const {formatMessage} = this.props.intl;

    return (
      <Tile>

        <TagListWrapper>
          <TextInput
            id="test3"
            labelText={formatMessage({id:"upvote.components.LoginForm.email"})}
            required
            hideLabel={false}
            light={false}
  
            value={this.props.email}
            onChange={this.props.onChangeEmail}
          />
        </TagListWrapper>

        <TagListWrapper>
          <TextInput
            id="password"
            labelText={formatMessage({id:"upvote.components.LoginForm.password"})}
            type="password"
            hideLabel={false}
            light={false}
            
            value={this.props.password}  
            onChange={this.props.onChangePassword}
          />
        </TagListWrapper>

        <TagListWrapper>
          <Button onClick={this.props.onPostLogin} onFocus={()=>{}}>
            {formatMessage({id:"upvote.components.LoginForm.loginButtonText"})}
          </Button>
        </TagListWrapper>
      </Tile>
    );
  }

}

export default injectIntl(LoginForm);

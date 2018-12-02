/*
 * LoginPage
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { changeEmail, changePassword, postLogin } from './actions';
import { makeSelectEmail, makeSelectPassword, makeSelectIsEmailValid, makeSelectIsPasswordValid, makeSelectSysFirstName } from './selectors'

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

import LoginForm from 'components/LoginForm';

const TagListWrapper2 = styled.div`
  margin: auto;
  width: 500px;
`;


export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Sign In</title>
          <meta name="description" content="Authentication for upVote system" />
        </Helmet>

        <TagListWrapper2>
        <LoginForm
          email={this.props.email}
          password={this.props.password}
        
          isEmailValid={this.props.isEmailValid}
          isPasswordValid={this.props.isPasswordValid}
        
          onChangeEmail={this.props.onChangeEmail}
          onChangePassword={this.props.onChangePassword}
          onPostLogin={this.props.onPostLogin}
        />
</TagListWrapper2>

      </div>
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

export function mapDispatchToProps(dispatch) {
  return {
    onChangeEmail: (evt) => dispatch(changeEmail(evt.target.value)),
    onChangePassword: (evt) => dispatch(changePassword(evt.target.value)),
    onPostLogin: () => dispatch(postLogin()),
  };
}

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  password: makeSelectPassword(),

  isEmailValid: makeSelectIsEmailValid(),
  isPasswordValid: makeSelectIsPasswordValid(),

  sysFirstName: makeSelectSysFirstName(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);

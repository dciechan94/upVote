/*
 * RegisterPage
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

import { changeRegistrationCode, changeEmail, changeFirstName, changeLastName, changePassword, changePasswordRepeat, 
  createNewUser, closeRegistrationResultModal } from './actions';
import { makeSelectRegistrationCode, makeSelectEmail, makeSelectFirstName, makeSelectLastName, makeSelectPassword,
  makeSelectPasswordRepeat, makeSelectIsRegistrationCodeValid, makeSelectIsEmailValid, makeSelectIsFirstNameValid,
  makeSelectIsLastNameValid, makeSelectIsPasswordValid, makeSelectIsPasswordRepeatValid, makeSelectShowRegistrationResultModal,
  makeSelectIsRegistrationResultError, makeSelectRegistrationResultMessage } from './selectors'

import RegistrationForm from 'components/RegistrationForm';


const TagListWrapper2 = styled.div`
padding-top: 20px;
margin: auto;
  width: 500px;
`;


export class RegisterPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Sign Up</title>
          <meta name="description" content="Authentication for upVote system" />
        </Helmet>


        <TagListWrapper2>

<RegistrationForm 
  registrationCode={this.props.registrationCode}
  email={this.props.email}
  firstName={this.props.firstName}
  lastName={this.props.lastName}
  password={this.props.password}
  passwordRepeat={this.props.passwordRepeat}

  isRegistrationCodeValid={this.props.isRegistrationCodeValid}
  isEmailValid={this.props.isEmailValid}
  isFirstNameValid={this.props.isFirstNameValid}
  isLastNameValid={this.props.isLastNameValid}
  isPasswordValid={this.props.isPasswordValid}
  isPasswordRepeatValid={this.props.isPasswordRepeatValid}

  onChangeRegistrationCode={this.props.onChangeRegistrationCode}
  onChangeEmail={this.props.onChangeEmail}
  onChangeFirstName={this.props.onChangeFirstName}
  onChangeLastName={this.props.onChangeLastName}
  onChangePassword={this.props.onChangePassword}
  onChangePasswordRepeat={this.props.onChangePasswordRepeat}
  onCreateNewUser={this.props.onCreateNewUser}

  showRegistrationResultModal={this.props.showRegistrationResultModal}
  isRegistrationResultError={this.props.isRegistrationResultError}
  registrationResultMessage={this.props.registrationResultMessage}

  onCloseRegistrationResultModal={this.props.onCloseRegistrationResultModal}
  />

       
</TagListWrapper2>

      </div>
    );
  }
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

  onChangeRegistrationCode: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangeFirstName: PropTypes.func,
  onChangeLastName: PropTypes.func,
  onChangePassword: PropTypes.func,
  onChangePasswordRepeat: PropTypes.func,
  onCreateNewUser: PropTypes.func,

  showRegistrationResultModal: PropTypes.bool,
  isRegistrationResultError: PropTypes.bool,
  registrationResultMessage: PropTypes.array,

  onCloseRegistrationResultModal: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeRegistrationCode: (evt) => dispatch(changeRegistrationCode(evt.target.value)),
    onChangeEmail: (evt) => dispatch(changeEmail(evt.target.value)),
    onChangeFirstName: (evt) => dispatch(changeFirstName(evt.target.value)),
    onChangeLastName: (evt) => dispatch(changeLastName(evt.target.value)),
    onChangePassword: (evt) => dispatch(changePassword(evt.target.value)),
    onChangePasswordRepeat: (evt) => dispatch(changePasswordRepeat(evt.target.value)),
    onCreateNewUser: () => dispatch(createNewUser()),

    onCloseRegistrationResultModal: () => dispatch(closeRegistrationResultModal()),
  };
}

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

  showRegistrationResultModal: makeSelectShowRegistrationResultModal(),
  isRegistrationResultError: makeSelectIsRegistrationResultError(),
  registrationResultMessage: makeSelectRegistrationResultMessage(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'register', reducer });
const withSaga = injectSaga({ key: 'register', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RegisterPage);

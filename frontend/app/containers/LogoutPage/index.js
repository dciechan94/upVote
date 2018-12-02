/*
 * LogoutPage
 */

import React from 'react';

import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';




export class LogoutPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {

  }

  render() {

    return (
      <div>
        <Helmet>
          <title>Sign Out</title>
          <meta name="description" content="Authentication for upVote system" />
        </Helmet>

        Trwa wylogowywanie...

      </div>
    );
  }
}

LogoutPage.propTypes = {
  // loading: PropTypes.bool,
  // error: PropTypes.oneOfType([
  //   PropTypes.object,
  //   PropTypes.bool,
  // ]),
  // repos: PropTypes.oneOfType([
  //   PropTypes.array,
  //   PropTypes.bool,
  // ]),
  // onSubmitForm: PropTypes.func,
  // username: PropTypes.string,
  // firstNameUI: PropTypes.object,
  // onChangeUsername: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
  //   onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
  //   onSubmitForm: (evt) => {
  //     if (evt !== undefined && evt.preventDefault) evt.preventDefault();
  //     dispatch(loadRepos());
  //   },
	// onInitFirstName: (evt) => dispatch(loadBaseData()),
  };
}

const mapStateToProps = createStructuredSelector({
  // repos: makeSelectRepos(),
  // username: makeSelectUsername(),
  // firstNameUI: makeSelectFirstName2(),
  // loading: makeSelectLoading(),
  // error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'logout', reducer });
const withSaga = injectSaga({ key: 'logout', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LogoutPage);

/**
 *
 * CreateElectionPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCreateElectionPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class CreateElectionPage extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>CreateElectionPage</title>
          <meta
            name="description"
            content="Description of CreateElectionPage"
          />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

CreateElectionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  createElectionPage: makeSelectCreateElectionPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'createElectionPage', reducer });
const withSaga = injectSaga({ key: 'createElectionPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CreateElectionPage);

/**
 *
 * BrowseElectionPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { HTMLTable } from "@blueprintjs/core";

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectBrowseElectionPage, { makeSelectBrowseData } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class BrowseElectionPage extends React.PureComponent {
  render() {

    var content = makeSelectBrowseData();

    var headers=[
      {key: "start_date", header: "Data rozpoczęcia"},
      {key: "end_date", header: "Data zakończenia"},
      {key: "name", header: "Nazwa"}, 
      {key: "description", header: "Opis"}];

    return (
      <div>
        <Helmet>
          <title>BrowseElectionPage</title>
          <meta
            name="description"
            content="Description of BrowseElectionPage"
          />
        </Helmet>
        
      </div>
    );
  }
}

BrowseElectionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  browseElectionPage: makeSelectBrowseElectionPage(),
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

const withReducer = injectReducer({ key: 'browseElectionPage', reducer });
const withSaga = injectSaga({ key: 'browseElectionPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BrowseElectionPage);

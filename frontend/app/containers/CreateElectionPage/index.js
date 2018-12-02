/*
 * CreateElectionPage
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Tile, TextInput, TextArea, Form, Button, DatePickerInput, TimePicker } from 'carbon-components-react';


import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

import CreateElectionForm from 'components/CreateElectionForm';

const TagListWrapper2 = styled.div`
  width: 500px;
`;


export class CreateElectionPage extends React.Component {

  componentDidMount() {
    //this.props.changeOrganizationId(this.props.match.params.id);
    //this.props.loadBasicDataForComponent();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Create Election Page</title>
          <meta name="description" content="Create Election Page description" />
        </Helmet>


<TagListWrapper2>
        <CreateElectionForm/>
</TagListWrapper2>
      </div>
    );
  }
}

CreateElectionPage.propTypes = {
  browseData: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    // changeOrganizationId: (id) => dispatch(initChangeOrganizationId(id)),
    // loadBasicDataForComponent: (organizationId) => dispatch(initBaseDataLoad(organizationId)),
    // loadDetailDataForComponent: (organizationId) => dispatch(initDetailDataLoad(organizationId)),
  };
}

const mapStateToProps = createStructuredSelector({
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'createElection', reducer });
const withSaga = injectSaga({ key: 'createElection', saga });


export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CreateElectionPage);


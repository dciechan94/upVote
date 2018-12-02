/*
 * Browse Page
 *
 * List all the features
 */
import React from 'react';
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { DataTable } from 'carbon-components-react';

import { makeSelectBrowseData } from './selectors';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';


const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader
} = DataTable;

export class BrowsePage extends React.Component {

  componentDidMount() {
    //this.props.changeOrganizationId(this.props.match.params.id);
    //this.props.loadBasicDataForComponent();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Browse Page</title>
          <meta name="description" content="Browse Page description" />
        </Helmet>


        <DataTable 
          rows={this.props.browseData.get("items")} 
          headers={[
            {key: "name", header: "Nazwa"}, 
            {key: "description", header: "Opis"}, 
            {key: "start_date", header: "Data rozpoczęcia"},
            {key: "end_date", header: "Data zakończenia"}]} 
          render={({ rows, headers }) => (
            <TableContainer title="Dostępne wybory:">
              <Table>
                <TableHead>
                  <TableRow>
                    {headers.map(header => (
                      <TableHeader {...{ header }}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
    
                <TableBody>
                  {this.props.browseData.get("items").map(row => (
                    <TableRow key={row.id}>
                      {headers.map(cell => (
                        <TableCell key={cell.key}>{row.get(cell.key)}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                  </TableBody>
                </Table>
              </TableContainer>
          )} 
        />
        
      </div>
    );
  }
}

BrowsePage.propTypes = {
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
  browseData: makeSelectBrowseData(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'browse', reducer });
const withSaga = injectSaga({ key: 'browse', saga });


export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BrowsePage);


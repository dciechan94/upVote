/*
 * OrganizationPage
 *
 * This is page for browsing details of organization /organization/id?filterQuery=xxx
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Tile, Accordion, AccordionItem, DataTable } from 'carbon-components-react';
import { TagList } from 'carbon-addons-cloud-react';

import { initChangeOrganizationId, initBaseDataLoad, initDetailDataLoad } from './actions';
import { makeSelectOrganizationId, makeSelectOrganizationBaseDataJson, makeSelectOrganizationDetailDataJson } from './selectors';

import OrganizationHeader from 'components/OrganizationHeader';
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

const TagListWrapper = styled.div`
  padding-bottom: 1rem;
`;


export class OrganizationPage extends React.PureComponent {
  
  componentDidMount() {
    this.props.changeOrganizationId(this.props.match.params.id);
    this.props.loadBasicDataForComponent();
  }
  

  render() {
    const props = this.props;
    const tags = props.organizationBaseDataJson.get('tags');
    const tagsModel = tags.map(tag => ({name: tag, type: 'functional'}));
    
    return (
      <article>
        <Helmet>
          <title>{`${props.organizationId}`}</title>
          <meta name="description" content="Organization details" />
        </Helmet>
        
        <Tile>  
        
          <OrganizationHeader
            name={props.organizationBaseDataJson.get('name')}
            short_description={props.organizationBaseDataJson.get('short_description')}
            rating={props.organizationBaseDataJson.get('rating')}
          />
          
          <Tile>

            <TagListWrapper>
              <TagList 
                tags={tagsModel.toArray()} 
                onIconClick={() => {}}
              />
            </TagListWrapper>
		        
            <Accordion>
              {props.organizationBaseDataJson.get("sections").map(section => (
                <AccordionItem title={section.get("name")} onHeadingClick={() => {}} open>
                </AccordionItem>
              ))}
		          <AccordionItem title="Oferta" onHeadingClick={() => {}} open>
			          <p>
			            W swojej bogatej ofercie produktów posiadamy buty taneczne do tańców standardowych i latynoamerykańskich, jak również kolekcję strojów tanecznych - turniejowych i treningowych - dla kobiet i dla mężczyzn. Zestawy akcesoriów konserwujących buty, flecki, szczotki, krawaty i wiele innych.
			          </p>
                <p>
                  <br/>
                </p>
			    
                <DataTable 
				          rows={[
				            {id: "a", name: "Sukienka LA BAS", protocol: "Rozmiar: S", port: "600 PLN"}, 
				            {id: "b", name: "Buty LA", protocol: "Rozmiar: 42", port: "260 PLN"}, 
				            {id: "c", name: "T-shirt treningowy", protocol: "Rozmiar: XL", port: "80 PLN"}]} 
				          headers={[
					          {key: "name", header: "Nazwa"}, 
					          {key: "protocol", header: "Opis"}, 
					          {key: "port", header: "Cena"}]} 
				          render={({ rows, headers }) => (
                    <TableContainer title="Polecane produkty:">
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
                          {rows.map(row => (
                            <TableRow key={row.id}>
                              {row.cells.map(cell => (
                                <TableCell key={cell.id}>{cell.value}</TableCell>
                              ))}
                            </TableRow>
                          ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                  )} 
                />
			        </AccordionItem>
			  
              <AccordionItem title="Kontakt" open onHeadingClick={() => {}}>
			          <p>
			            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
			          </p>
			        </AccordionItem>
			  
            </Accordion>
		      </Tile>
		    </Tile>
      </article>
    );
  }
}

OrganizationPage.propTypes = {
  // Organization Id
  organizationId: PropTypes.number,
  changeOrganizationId: PropTypes.func,
  //Basic data
  loadBasicDataForComponent: PropTypes.func,
  loadingBaseData: PropTypes.bool,
  organizationBaseDataJson: PropTypes.object,
  //Detailed data
  loadDetailDataForComponent: PropTypes.func,
  loadingDetailsData: PropTypes.bool,
  organizationDetailDataJson: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    changeOrganizationId: (id) => dispatch(initChangeOrganizationId(id)),
    loadBasicDataForComponent: (organizationId) => dispatch(initBaseDataLoad(organizationId)),
    loadDetailDataForComponent: (organizationId) => dispatch(initDetailDataLoad(organizationId)),
  };
}

const mapStateToProps = createStructuredSelector({
  organizationId: makeSelectOrganizationId(),
  organizationBaseDataJson: makeSelectOrganizationBaseDataJson(),
  organizationDetailDataJson: makeSelectOrganizationDetailDataJson(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'organization', reducer });
const withSaga = injectSaga({ key: 'organization', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OrganizationPage);

import React from 'react';
import styled from 'styled-components';

import { Tile, Breadcrumb, BreadcrumbItem } from 'carbon-components-react';

import RatingPresenter from 'components/RatingPresenter';


const DPHeader = styled.div`
  font-size: 1.75rem;
  font-weight: 300;
  margin-top: 10px;
  padding: 10px 15px 5px 0;
  color: #5a6872;
  display: inline;
`;

const DPHeaderDesc = styled.div`
  font-size: 0.75rem;
  padding: 5px 15px 0 0;
  color: #5a6872;
`;

const HeaderLine = styled.div`
  padding: 12px 0 3px 0;
`;

function OrganizationHeader(props) {
  return (
    <Tile>

		  <Breadcrumb>
				<BreadcrumbItem href="www.google.com">
				  Odzież taneczna
				</BreadcrumbItem>
				<BreadcrumbItem href="www.google.com">
				  Sklepy z odzieżą
				</BreadcrumbItem>
			</Breadcrumb>

			<HeaderLine>
				<DPHeader>
				  {props.name} 
				</DPHeader>
				
        <RatingPresenter rating={props.rating}/>
			</HeaderLine>
			  
      <DPHeaderDesc>
			  {props.short_description}
			</DPHeaderDesc>

		</Tile>
  );
}

export default OrganizationHeader;

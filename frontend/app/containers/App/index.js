/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { Tile } from 'carbon-components-react';


import HomePage from 'containers/HomePage/Loadable';
import OrganizationPage from 'containers/OrganizationPage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import FixedLeftNavBar from 'components/FixedLeftNavBar';
import Header from 'components/Header';
import CarbonFooter from 'components/CarbonFooter';


const AppWrapper = styled.div`
  max-width: calc(1068px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px 0 16px;
  flex-direction: column;
`;

const MainTileWrapper = styled.div`
min-height: 80vh;
`;

export default function App() {
	/*

	
				<Route path="/articles/:id" component={ArticlePage} />
				<Route path="/browse/:type" component={BrowsePage} />
				<Route path="/search?query=:query" component={SearchPage} />
				<Route path="/organization/:id" component={FeaturePage} />

				*/
  return (
<div>
  <FixedLeftNavBar/>

    <AppWrapper>
      <Helmet
        titleTemplate="%s - Myyy"
        defaultTitle="My default Title"
      >
	    <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="My App" />
      </Helmet>
      <Header />

      <Tile>
        <MainTileWrapper>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/browse" component={HomePage} />
          <Route path="/features" component={FeaturePage} />
          <Route path="/organization/:id" component={OrganizationPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        </MainTileWrapper>
      </Tile>
      <CarbonFooter />
    </AppWrapper>
</div>
  );
}

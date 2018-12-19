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


import { Card } from "@blueprintjs/core";

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import BrowseElectionPage from 'containers/BrowseElectionPage/Loadable';
import CreateElectionPage from 'containers/CreateElectionPage/Loadable';
import ManagePollsPage from 'containers/ManagePollsPage/Loadable';
import ManageUsersPage from 'containers/ManageUsersPage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import GenerateTokensPage from 'containers/GenerateTokensPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import MenuBar from 'containers/MenuBar';
import Header from 'components/Header';
import Footer from 'components/Footer';


import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(1068px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - upVote"
        defaultTitle="UP Vote"
      >
        <meta name="description" content="Welcome to Voting System of Uniwersytet Pedagogiczny" />
      </Helmet>
      <Header />
      <MenuBar />

      <Card>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signin" component={LoginPage} />
          <Route exact path="/signup" component={RegisterPage} />
          <Route exact path="/browse/elections/:type" component={BrowseElectionPage} />
          <Route exact path="/elections/create" component={CreateElectionPage} />
          <Route exact path="/elections/manage" component={ManagePollsPage} />
          <Route exact path="/users/manage" component={ManageUsersPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/tokens" component={GenerateTokensPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </Card>

      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}

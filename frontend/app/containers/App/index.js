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

import { makeSelectCurrentUser } from "./selectors";


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
      
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signin" component={LoginPage} />
        <Route path="/signup" component={RegisterPage} />
        <Route path="/browse/elections/:type" component={BrowseElectionPage} />
        <Route path="/elections/create" component={CreateElectionPage} />
        <Route path="/elections/manage" component={ManagePollsPage} />
        <Route path="/users/manage" component={ManageUsersPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/tokens" component={GenerateTokensPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      

      <Footer />
      
      <GlobalStyle />
    </AppWrapper>
  );
}

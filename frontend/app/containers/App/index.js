import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';


import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import { useInjectReducer } from 'utils/injectReducer';

import { closeGlobalDialog } from './actions'

import {makeSelectGlobalDialogIcon,
  makeSelectGlobalDialogTitle,
  makeSelectGlobalDialogIntent,
  makeSelectIsGlobalDialogOpen,
  makeSelectGlobalDialogMessage,
  makeSelectGlobalDialogButtonText,} from './selectors'

import reducer from './reducer';

import {
  Button,
  Classes,
  Dialog,
  Icon,
} from "@blueprintjs/core";

import Header from 'components/Header';
import MenuBar from 'containers/MenuBar';
import Footer from 'components/Footer';

import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import TermsPage from 'containers/TermsPage/Loadable';
import CreateElectionPage from 'containers/CreateElectionPage/Loadable';
import BrowseElectionPage from 'containers/BrowseElectionPage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import GenerateTokensPage from 'containers/GenerateTokensPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(1068px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px 0 16px;
  flex-direction: column;
`;

const key = 'global';

export function App({
  intl,
  globalDialogIcon,
  onGlobalDialogClose,
  globalDialogTitle,
  globalDialogIntent,
  isGlobalDialogOpen,
  globalDialogMessage,
  onGlobalDialogButtonClick,
  globalDialogButtonText,
}) {
  useInjectReducer({ key, reducer });

  const {formatMessage} = intl;

  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - UP Vote"
        defaultTitle="UP Vote"
      >
        <meta name="description" content="Welcome to Voting System of Uniwersytet Pedagogiczny" />
      </Helmet>

      <Header />
	    <MenuBar />

      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/signin" component={LoginPage} />
        <Route path="/signup" component={RegisterPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/elections/create" component={CreateElectionPage} />
        <Route path="/elections/update/:id" component={CreateElectionPage} />
        <Route path="/elections/browse" component={BrowseElectionPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/tokens" component={GenerateTokensPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>

      <Footer />

      <Dialog
        icon={<Icon icon={globalDialogIcon} iconSize={24} intent={globalDialogIntent} />}
        onClose={onGlobalDialogClose}
        title={globalDialogTitle}
        isOpen={isGlobalDialogOpen}
      >
        <div className={Classes.DIALOG_BODY}>
            <p>
                <strong>
                  {globalDialogMessage}
                </strong>
            </p>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={onGlobalDialogButtonClick}>{globalDialogButtonText}</Button>
            </div>
        </div>
      </Dialog>

      <GlobalStyle />
    </AppWrapper>
  );
}


const mapStateToProps = createStructuredSelector({
  globalDialogIcon: makeSelectGlobalDialogIcon(),
  globalDialogTitle: makeSelectGlobalDialogTitle(),
  globalDialogIntent: makeSelectGlobalDialogIntent(),
  isGlobalDialogOpen: makeSelectIsGlobalDialogOpen(),
  globalDialogMessage: makeSelectGlobalDialogMessage(),
  globalDialogButtonText: makeSelectGlobalDialogButtonText(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGlobalDialogClose: () => dispatch(closeGlobalDialog()),
    onGlobalDialogButtonClick: () => dispatch(closeGlobalDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
  memo
)(App);


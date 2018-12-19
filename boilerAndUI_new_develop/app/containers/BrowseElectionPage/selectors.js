import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the browseElectionPage state domain
 */

const selectBrowseElectionPageDomain = state =>
  state.get('browseElectionPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BrowseElectionPage
 */

const makeSelectBrowseElectionPage = () =>
  createSelector(selectBrowseElectionPageDomain, substate => substate.toJS());

export default makeSelectBrowseElectionPage;
export { selectBrowseElectionPageDomain };

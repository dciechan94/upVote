import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the createElectionPage state domain
 */

const selectCreateElectionPageDomain = state =>
  state.get('createElectionPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CreateElectionPage
 */

const makeSelectCreateElectionPage = () =>
  createSelector(selectCreateElectionPageDomain, substate => substate.toJS());

export default makeSelectCreateElectionPage;
export { selectCreateElectionPageDomain };

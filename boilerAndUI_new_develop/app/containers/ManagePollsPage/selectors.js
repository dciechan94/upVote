import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the managePollsPage state domain
 */

const selectManagePollsPageDomain = state =>
  state.get('managePollsPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManagePollsPage
 */

const makeSelectManagePollsPage = () =>
  createSelector(selectManagePollsPageDomain, substate => substate.toJS());

export default makeSelectManagePollsPage;
export { selectManagePollsPageDomain };

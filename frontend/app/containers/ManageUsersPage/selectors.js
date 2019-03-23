import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the manageUsersPage state domain
 */

const selectManageUsersPageDomain = state =>
  state.get('manageUsersPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManageUsersPage
 */

const makeSelectManageUsersPage = () =>
  createSelector(selectManageUsersPageDomain, substate => substate.toJS());

export default makeSelectManageUsersPage;
export { selectManageUsersPageDomain };

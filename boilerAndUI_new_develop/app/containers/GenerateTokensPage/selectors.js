import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the generateTokensPage state domain
 */

const selectGenerateTokensPageDomain = state =>
  state.get('generateTokensPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by GenerateTokensPage
 */

const makeSelectGenerateTokensPage = () =>
  createSelector(selectGenerateTokensPageDomain, substate => substate.toJS());

export default makeSelectGenerateTokensPage;
export { selectGenerateTokensPageDomain };

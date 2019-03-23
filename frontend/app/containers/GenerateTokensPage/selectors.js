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
const makeSelectTokensCount = () => createSelector(
  selectGenerateTokensPageDomain,
  (generateTokensState) => generateTokensState.get('count')
);

const makeSelectTokensTimeout = () => createSelector(
  selectGenerateTokensPageDomain,
  (generateTokensState) => generateTokensState.get('timeout')
);

const makeSelectTokenIds = () => createSelector(
  selectGenerateTokensPageDomain,
  (generateTokensState) => generateTokensState.get('codes')
);

const makeSelectCodesSelection = () => createSelector(
  selectGenerateTokensPageDomain,
  (generateTokensState) => generateTokensState.get('codesSelection')
);

/**
 * Default selector used by GenerateTokensPage
 */

const makeSelectGenerateTokensPage = () =>
  createSelector(selectGenerateTokensPageDomain, substate => substate.toJS());

export default makeSelectGenerateTokensPage;
export { 
  selectGenerateTokensPageDomain,
  makeSelectTokensCount, 
  makeSelectTokensTimeout,
  makeSelectTokenIds,
  makeSelectCodesSelection
};

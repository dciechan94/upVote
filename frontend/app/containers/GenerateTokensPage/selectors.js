import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGenerateTokens = state => state.generateTokens || initialState;


const makeSelectTokenCount = () =>
  createSelector(
    selectGenerateTokens,
    (generateTokensState) => generateTokensState.tokenCount
  );

const makeSelectTokenValidInDays = () =>
  createSelector(
    selectGenerateTokens,
    (generateTokensState) => generateTokensState.tokenValidInDays
  );

const makeSelectActualTokens = () =>
  createSelector(
    selectGenerateTokens,
    (generateTokensState) => generateTokensState.actualTokens
  );

const makeSelectNewTokens = () =>
  createSelector(
    selectGenerateTokens,
    (generateTokensState) => generateTokensState.newTokens
  );

export {
  selectGenerateTokens,

  makeSelectTokenCount,
  makeSelectTokenValidInDays,
  makeSelectActualTokens,
  makeSelectNewTokens,
};

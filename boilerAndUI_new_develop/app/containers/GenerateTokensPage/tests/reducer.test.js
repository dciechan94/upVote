import { fromJS } from 'immutable';
import generateTokensPageReducer from '../reducer';

describe('generateTokensPageReducer', () => {
  it('returns the initial state', () => {
    expect(generateTokensPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});

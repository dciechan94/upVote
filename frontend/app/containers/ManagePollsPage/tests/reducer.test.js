import { fromJS } from 'immutable';
import managePollsPageReducer from '../reducer';

describe('managePollsPageReducer', () => {
  it('returns the initial state', () => {
    expect(managePollsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});

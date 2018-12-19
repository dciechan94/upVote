import { fromJS } from 'immutable';
import browseElectionPageReducer from '../reducer';

describe('browseElectionPageReducer', () => {
  it('returns the initial state', () => {
    expect(browseElectionPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});

import { fromJS } from 'immutable';
import createElectionPageReducer from '../reducer';

describe('createElectionPageReducer', () => {
  it('returns the initial state', () => {
    expect(createElectionPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});

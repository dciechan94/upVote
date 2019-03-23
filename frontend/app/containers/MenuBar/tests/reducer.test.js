import { fromJS } from 'immutable';
import menuBarReducer from '../reducer';

describe('menuBarReducer', () => {
  it('returns the initial state', () => {
    expect(menuBarReducer(undefined, {})).toEqual(fromJS({}));
  });
});

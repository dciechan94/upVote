import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the menuBar state domain
 */

const selectMenuBarDomain = state => state.get('menuBar', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by MenuBar
 */

const makeSelectMenuBar = () =>
  createSelector(selectMenuBarDomain, substate => substate.toJS());

export default makeSelectMenuBar;
export { selectMenuBarDomain };

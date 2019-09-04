import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectMenuBar = state => state.menuBar || initialState;

export { selectMenuBar };

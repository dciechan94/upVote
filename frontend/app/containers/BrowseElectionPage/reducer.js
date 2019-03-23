/*
 *
 * BrowseElectionPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_BROWSE_DATA,
  LOAD_BROWSE_DATA_SUCCESS,
  LOAD_BROWSE_DATA_ERROR,
} from './constants';

export const initialState = fromJS({
  browseData: {
    items: [
      { id: 1, name: "Wybory Miss Polsatu", description: "To jest krótki opis wydarzenia", start_date: "21.08.2018r. 08:00", end_date: "22.08.2018r. 08:00" },
      { id: 2, name: "Wybory Miss TVN", description: "...", start_date: "20.08.2018r. 08:00", end_date: "22.08.2018r. 10:00" },
      { id: 3, name: "Wybory Miss Polonia", description: "...", start_date: "23.08.2018r. 08:00", end_date: "28.08.2018r. 08:00" },
    ],
    paging: {
      begin: 0,
      end: 9,
      pageSize: 10,
      count: 100
    }
  }
});

function browseElectionPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BROWSE_DATA:
      return state
        .set('loadingBaseData', true);
	  case LOAD_BROWSE_DATA_SUCCESS:
      return state
        .set('loadingBaseData', false)
        .set('organizationBaseDataJson', action.jsonData);
	  case LOAD_BROWSE_DATA_ERROR:
      return state
        .set('loadingBaseData', false);

    default:
      return state;
  }
}

export default browseElectionPageReducer;

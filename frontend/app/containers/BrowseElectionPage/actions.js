/*
 *
 * BrowseElectionPage actions
 *
 */

import {
  LOAD_BROWSE_DATA,
  LOAD_BROWSE_DATA_SUCCESS,
  LOAD_BROWSE_DATA_ERROR,
} from './constants';

export function initBrowseDataLoad(browseType) {
  return {
    type: LOAD_BROWSE_DATA,
    browseType,
  };
}

export function loadedBrowseData(jsonData) {
  return {
    type: LOAD_BROWSE_DATA_SUCCESS,
    jsonData,
  };
}

export function loadingBrowseDataError(jsonData) {
  return {
    type: LOAD_BROWSE_DATA_ERROR,
    jsonData,
  };
}


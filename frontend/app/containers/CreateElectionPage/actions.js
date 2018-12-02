/*
 * BrowsePage Actions
 */

import {
  LOAD_BROWSE_DATA,
  LOAD_BROWSE_DATA_SUCCESS,
  LOAD_BROWSE_DATA_ERROR,
} from './constants';


/**
 * Initialize request for organization basic data
 *
 * @param  {browseType} browseType     Type of objects to browse
 *
 * @return {object}    An action object with a type of LOAD_BROWSE_DATA
 */
export function initBrowseDataLoad(browseType) {
  return {
    type: LOAD_BROWSE_DATA,
    browseType,
  };
}

/**
 * Successful finalize request for browsed objects
 *
 * @param  {jsonData} jsonData     The browsed objects
 *
 * @return {object}    An action object with a type of LOAD_BROWSE_DATA_SUCCESS
 */
export function loadedBrowseData(jsonData) {
  return {
    type: LOAD_BROWSE_DATA_SUCCESS,
    jsonData,
  };
}

/**
 * Unsuccessful finalize request for browsed objects
 *
 * @param  {jsonData} jsonData     The error details
 *
 * @return {object}    An action object with a type of LOAD_BROWSE_DATA_ERROR
 */
export function loadingBrowseDataError(jsonData) {
  return {
    type: LOAD_BROWSE_DATA_ERROR,
    jsonData,
  };
}

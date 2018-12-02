/*
 * OrganizationPage Actions
 */

import {
  CHANGE_ORGANIZATION_ID,
  LOAD_BASE_DATA,
  LOAD_BASE_DATA_SUCCESS,
  LOAD_BASE_DATA_ERROR,
  LOAD_DETAIL_DATA,
  LOAD_DETAIL_DATA_SUCCESS,
  LOAD_DETAIL_DATA_ERROR,
} from './constants';

/**
 * Change organization id
 *
 * @param  {id} id     The id of the organization
 *
 * @return {object}    An action object with a type of CHANGE_ORGANIZATION_ID
 */
export function initChangeOrganizationId(id) {
  return {
    type: CHANGE_ORGANIZATION_ID,
    id,
  };
}

/**
 * Initialize request for organization basic data
 *
 * @param  {id} id     The id of the organization
 *
 * @return {object}    An action object with a type of LOAD_BASE_DATA
 */
export function initBaseDataLoad(id) {
  return {
    type: LOAD_BASE_DATA,
    id,
  };
}

/**
 * Successful finalize request for organization basic data
 *
 * @param  {jsonData} jsonData     The base data of the organization
 *
 * @return {object}    An action object with a type of LOAD_BASE_DATA_SUCCESS
 */
export function loadedBaseData(jsonData) {
  return {
    type: LOAD_BASE_DATA_SUCCESS,
    jsonData,
  };
}

/**
 * Unsuccessful finalize request for organization basic data
 *
 * @param  {jsonData} jsonData     The error details
 *
 * @return {object}    An action object with a type of LOAD_BASE_DATA_ERROR
 */
export function loadingBaseDataError(jsonData) {
  return {
    type: LOAD_BASE_DATA_ERROR,
    jsonData,
  };
}

/**
 * Initialize request for organization detail data
 *
 * @param  {id} id     The id of the organization
 *
 * @return {object}    An action object with a type of LOAD_DETAIL_DATA
 */
export function initDetailDataLoad(id) {
  return {
    type: LOAD_DETAIL_DATA,
    id,
  };
}

/**
 * Successful finalize request for organization basic data
 *
 * @param  {jsonData} jsonData     The detail data of the organization
 *
 * @return {object}    An action object with a type of LOAD_DETAIL_DATA_SUCCESS
 */
export function loadedDetailData(jsonData) {
  return {
    type: LOAD_DETAIL_DATA_SUCCESS,
    jsonData,
  };
}

/**
 * Unsuccessful finalize request for organization detail data
 *
 * @param  {jsonData} jsonData     The error details
 *
 * @return {object}    An action object with a type of LOAD_DETAIL_DATA_ERROR
 */
export function loadingDetailDataError(jsonData) {
  return {
    type: LOAD_DETAIL_DATA_ERROR,
    jsonData,
  };
}
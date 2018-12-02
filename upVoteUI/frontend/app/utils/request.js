import 'whatwg-fetch';

import { authenticationError } from '../containers/App/actions';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  console.log("Enter parseJSON")
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  console.log(response)
  //console.log(response.json())
  return response.json().then(data => ({
    data: data,
    status: response.status
}));
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  console.log("Enter checkStatus")
  if(response.ok) {
    console.log("Response.ok")

    console.log(response)
    return response;

  }
  
 /* console.log("Response not ok")
  return response.json().then(data => ({
    data: data,
    status: response.status
}));
  */
  
  console.log(response)
  return response;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
}

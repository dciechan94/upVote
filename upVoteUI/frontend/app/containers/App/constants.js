/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'pl';
export const PROJECT_NAME = 'upVote';

export const SERVER_REST_PROTOCOL = 'http';
export const SERVER_REST_IP = 'localhost';
export const SERVER_REST_PORT = '8082';
export const SERVER_REST_URI = '';
export const SERVER_REST_URL = SERVER_REST_PROTOCOL + '://' + SERVER_REST_IP + ':' + SERVER_REST_PORT + '/' + SERVER_REST_URI;


export const COMPONENT_NAME = 'App';

export const AUTHETICATION_ERROR = PROJECT_NAME + '/' + COMPONENT_NAME + '/AUTHETICATION_ERROR';

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';
export const LOAD_BASEDATA = 'boilerplate/HomePage/LOAD_BASEDATA';
export const LOAD_BASEDATA_SUCCESS = 'boilerplate/HomePage/LOAD_BASEDATA_SUCCESS';


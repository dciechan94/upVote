import { PROJECT_NAME } from '../App/constants'

export const COMPONENT_NAME = 'GenerateTokensPage';
export const GENERATE_TOKENS_PAGE_PREFIX = PROJECT_NAME + '/' + COMPONENT_NAME;

export const CHANGE_TOKENS_COUNT = GENERATE_TOKENS_PAGE_PREFIX + '/CHANGE_TOKENS_COUNT';
export const CHANGE_TOKENS_VALID_TIMEOUT = GENERATE_TOKENS_PAGE_PREFIX + '/CHANGE_TOKENS_VALID_TIMEOUT';
export const CHANGE_TOKENS_SELECTION = GENERATE_TOKENS_PAGE_PREFIX + '/CHANGE_TOKENS_SELECTION';

export const GENERATE_TOKENS = GENERATE_TOKENS_PAGE_PREFIX + '/GENERATE_TOKENS';
export const GENERATE_TOKENS_SUCCESS = GENERATE_TOKENS_PAGE_PREFIX + '/GENERATE_TOKENS_SUCCESS';
export const GENERATE_TOKENS_ERROR = GENERATE_TOKENS_PAGE_PREFIX + '/GENERATE_TOKENS_ERROR';

export const GET_ACTIVE_TOKENS = GENERATE_TOKENS_PAGE_PREFIX + '/GET_ACTIVE_TOKENS';
export const GET_ACTIVE_TOKENS_SUCCESS = GENERATE_TOKENS_PAGE_PREFIX + '/GET_ACTIVE_TOKENS_SUCCESS';
export const GET_ACTIVE_TOKENS_ERROR = GENERATE_TOKENS_PAGE_PREFIX + '/GET_ACTIVE_TOKENS_ERROR';

export const DELETE_TOKENS = GENERATE_TOKENS_PAGE_PREFIX + '/DELETE_TOKENS';
export const DELETE_TOKENS_SUCCESS = GENERATE_TOKENS_PAGE_PREFIX + '/DELETE_TOKENS_SUCCESS';
export const DELETE_TOKENS_ERROR = GENERATE_TOKENS_PAGE_PREFIX + '/DELETE_TOKENS_ERROR';

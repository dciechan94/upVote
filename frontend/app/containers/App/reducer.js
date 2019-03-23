/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import { FATAL_ERROR_OCCURED } from './constants';

// The initial state of the App
const initialState = fromJS({
  currentUser: {
    id: 2,
    firstName: "BasicName",
    lastName: "BasicLastname",
    email: "basic@basic.com",
    password: "1q2w3e"
  }
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case FATAL_ERROR_OCCURED:
      console.log("Error occurred")
      console.log(action.message)
    default:
      return state;
  }
}

export default appReducer;

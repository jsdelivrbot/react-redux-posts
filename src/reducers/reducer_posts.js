import { FETCH_POST, FETCH_POSTS, CREATE_POST, DELETE_POST } from '../actions';
import _ from 'lodash';

// Use an object as the application state instead of an array. It is better and easier ;)
export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_POST:
            const post = action.payload.data;

            // ES5 format. Identical to the one below.
            // const newState = { ...state };
            // newState[post.id] = post;
            // return newState;

            // Take all the existing posts out of the state and put them in that object
            // ES6 format
            // Makes a new key with the id with the value of the data.
            return { ...state, [action.payload.data.id]: action.payload.data};
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');
        case DELETE_POST:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}

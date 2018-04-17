import axios from 'axios';
import Axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';

const REDUX_BLOG_API_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=liverpool';

export function fetchPosts() {
    // We are going to make a request using Axios. request is a promise.
    const request = Axios.get(`${REDUX_BLOG_API_URL}/posts${API_KEY}`);

    // The payload property is going to reach the reducer not as a promise but as the response data.
    // This is due to the redux-promise middleware.
    return {
        type: FETCH_POSTS,
        payload: request
    };
}

export function createPost(values) {
    const request = Axios.post(`${REDUX_BLOG_API_URL}/posts${API_KEY}`, values);
    return {
        type: CREATE_POST,
        payload: request
    }
}

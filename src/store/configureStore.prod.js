import {createStore, applyMiddleware, compose} from 'redux';
import {rootReducer} from '../reducers';
import thunk from 'redux-thunk'
import GithubServiceApi from '../api/GithubApi';

const configureStore = (initialState) => {
    return createStore(rootReducer, initialState,
        compose(applyMiddleware(thunk, GithubServiceApi)));
};

export default configureStore;



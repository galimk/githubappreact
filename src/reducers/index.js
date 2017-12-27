import GithubReducer from './GithubReducer';
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'


const rootReducer = combineReducers({
    GithubReducer,
    router: routerReducer
});

export { rootReducer };

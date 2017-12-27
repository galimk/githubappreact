import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {rootReducer} from '../reducers';
import DevTools from '../containers/DevTools';
import thunk from 'redux-thunk'
import GithubServiceApi from '../api/GithubApi';
import createHistory from 'history/createBrowserHistory'
import {routerMiddleware} from 'react-router-redux'

const history = createHistory();

const configureStore = (initialState) => {

    let store = createStore(rootReducer, initialState,
        compose(applyMiddleware(thunk, routerMiddleware(history), GithubServiceApi),
            DevTools.instrument()
        ));

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            store.replaceReducer(rootReducer)
        })
    }

    return store
};

export default configureStore;



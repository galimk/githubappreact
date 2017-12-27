import lodash from 'lodash';
import {ActionTypes} from '../actions/ActionTypes';


const GithubReducer = (state = {
    authContext: {
        isAuthenticated: false,
        accessToken: null,
        userName: null,
        invalidToken: false
    }
}, action) => {

    let newState = lodash.cloneDeep(state);

    switch (action.type) {
        case `${ActionTypes.VALIDATE_TOKEN}_FAILURE`:
            newState.authContext.invalidToken = true;
            break;
        case ActionTypes.USER_NAME_SET:
            newState.authContext.accessToken = action.payload.accessToken;
            newState.authContext.userName = action.payload.userName;
            newState.authContext.invalidToken = false;
            newState.authContext.isAuthenticated = true;
            window.localStorage.setItem('accessToken', action.payload.accessToken);
            window.localStorage.setItem('userName', action.payload.userName);
            break;
        case ActionTypes.LOG_OUT:
            newState.authContext.accessToken = null;
            newState.authContext.userName = null;
            newState.authContext.invalidToken = false;
            newState.authContext.isAuthenticated = false;
            window.localStorage.removeItem('accessToken');
            window.localStorage.removeItem('userName');
            break;
        default:
            if (window.localStorage.getItem('accessToken') != null) {
                newState.authContext.accessToken = window.localStorage.getItem('accessToken');
                newState.authContext.userName = window.localStorage.getItem('userName');
                newState.authContext.invalidToken = false;
                newState.authContext.isAuthenticated = true;
            }
            break;

    }

    return newState;

};


export default GithubReducer;

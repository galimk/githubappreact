import lodash from 'lodash';
import {ActionTypes} from '../actions/ActionTypes';


const GithubReducer = (state = {
    authContext: {
        isAuthenticated: false,
        accessToken: null,
        userName: null,
        invalidToken: false
    },

    orgs: {
        lastSeenId: null,
        items: [],
        loading: false,
        lastPage: null
    },

    members: {
        lastPage: 1,
        items: [],
        loading: false,
        lastSeenId: null
    },

    repos: {
        lastPage: 1,
        items: [],
        loading: false,
        lastSeenId: null
    },

    selectedOrg: null,
    orgSearchInvalid: false,
    switchToOrg: null,
    repo: null,
    stargazers: []
}, action) => {

    let newState = lodash.cloneDeep(state);

    if (action.type.startsWith('GET_') && !action.type.startsWith(ActionTypes.GET_REPO_DETAILS) && !action.type.startsWith(ActionTypes.GET_REPO_STARGAZERS)) {
        return githubLists(newState, action);
    }

    switch (action.type) {
        case `${ActionTypes.GET_REPO_STARGAZERS}_SUCCESS`:
           newState.stargazers = action.data;
            break;
        case `${ActionTypes.GET_REPO_DETAILS}_SUCCESS`:
            newState.repo = action.data;
            break;
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
        case ActionTypes.SELECT_ORG:
            newState.selectedOrg = action.payload.orgName;
            newState.members.items = [];
            newState.members.lastSeenId = null;
            newState.members.lastPage = 1;
            newState.repos.items = [];
            newState.repos.lastSeenId = null;
            newState.repos.lastPage = 1;
            newState.orgSearchInvalid = false;
            newState.foundOrg = null;
            newState.switchToOrg = null;
            break;
        case ActionTypes.ORG_FOUND:
            if (newState.selectedOrg !== action.payload.orgName) {
                newState.switchToOrg = action.payload.orgName;
            }
            newState.orgSearchInvalid = false;
            break;
        case ActionTypes.ORG_NOT_FOUND:
            newState.orgSearchInvalid = true
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


const githubLists = (newState, action) => {
    let operationResult = action.type.split('_')[3];
    let subject = action.type.split('_')[2].toLowerCase();
    switch (operationResult) {
        case "SUCCESS":
            let items = action.data;
            let lastSeenId = items.length == 30 ? items[items.length - 1].id : null;

            if (newState[subject].lastPage != null && lastSeenId != null) {
                newState[subject].lastPage = newState[subject].lastPage + 1;
            }

            newState[subject].lastSeenId = lastSeenId;


            for (let item of items)
                newState[subject].items.push(item);
            newState[subject].loading = false;
            break;
        case "FAILURE":
            break;
        case "INIT":
            newState[subject].loading = true;
            break;
    }
    return newState;
};

export default GithubReducer;

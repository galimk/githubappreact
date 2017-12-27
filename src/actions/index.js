import {ActionTypes} from './ActionTypes';

export const validateToken = (token) => (dispatch) => {
    return dispatch({
        type: ActionTypes.VALIDATE_TOKEN,
        payload: {
            token: token
        }
    });
};

export const loadOrgs = (lastSeenId) => (dispatch) => {
    return dispatch({
        type: ActionTypes.GET_ORGS,
        payload: {
            lastSeenId
        }
    });
};

export const loadRepos = (page, organization) => (dispatch) => {
    return dispatch({
        type: ActionTypes.GET_REPOS,
        payload: {
            organization,
            page
        }
    });
};


export const loadMembers = (page, organization) => (dispatch) => {
    return dispatch({
        type: ActionTypes.GET_MEMBERS,
        payload: {
            organization,
            page
        }
    });
};

export const selectOrganization = (orgName) => (dispatch) => {
    return dispatch({
        type: ActionTypes.SELECT_ORG,
        payload: {
            orgName: orgName
        }
    });
};

export const getRepoDetails = (owner, repoName) => (dispatch) => {
    return dispatch({
        type: ActionTypes.GET_REPO_DETAILS,
        payload: {
            owner, repoName
        }
    });
};

export const getRepoStargazers = (owner, repoName) => (dispatch) => {
    return dispatch({
        type: ActionTypes.GET_REPO_STARGAZERS,
        payload: {
            owner, repoName
        }
    });
};

export const logOut = () => (dispatch) => {
    return dispatch({
        type: ActionTypes.LOG_OUT
    });
};


import {ActionTypes} from './ActionTypes';

export const validateToken = (token) => (dispatch) => {
    return dispatch({
        type: ActionTypes.VALIDATE_TOKEN,
        payload: {
            token: token
        }
    });
};

export const loadOrgs = () => (dispatch) => {
    return dispatch({
        type: ActionTypes.GET_ORGS
    });
};

export const loadRepos = (organization) => (dispatch) => {
    return dispatch({
        type: ActionTypes.GET_REPOS,
        payload: {
            organization
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


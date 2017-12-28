import request from 'superagent';
import {ActionTypes} from '../actions/ActionTypes';
import {push} from 'react-router-redux';

const GithubBaseUri = 'https://api.github.com/';

const GithubApiService = store => next => action => {
    switch (action.type) {
        case ActionTypes.VALIDATE_TOKEN:
            return request.get(`${GithubBaseUri}?access_token=${action.payload.token}`).end((err, res) => {
                if (!err) {
                    request.get(`${GithubBaseUri}user?access_token=${action.payload.token}`).end((err2, res2) => {
                        if (!err2) {
                            let data = JSON.parse(res2.text);
                            next({
                                type: ActionTypes.USER_NAME_SET,
                                payload: {userName: data.login, accessToken: action.payload.token}
                            });
                        } else {
                            next({
                                type: ActionTypes.VALIDATE_TOKEN + '_FAILURE'
                            });
                        }
                    });
                } else {
                    next({
                        type: ActionTypes.VALIDATE_TOKEN + '_FAILURE'
                    });
                }
            });
        case ActionTypes.GET_ORGS:
            return fetchGitHubData(`organizations`,
                action.payload.lastSeenId, next, ActionTypes.GET_ORGS, false);
        case ActionTypes.GET_REPOS:
            return fetchGitHubData(`orgs/${action.payload.organization}/repos`,
                action.payload.page, next, ActionTypes.GET_REPOS, true);
        case ActionTypes.GET_MEMBERS:
            return fetchGitHubData(`orgs/${action.payload.organization}/members`,
                action.payload.page, next, ActionTypes.GET_MEMBERS, true);
        case ActionTypes.GET_REPO_DETAILS:
            return fetchGitHubData(`repos/${action.payload.owner}/${action.payload.repoName}`, null, next,
                ActionTypes.GET_REPO_DETAILS);
        case ActionTypes.GET_REPO_STARGAZERS:
            return fetchGitHubData(`repos/${action.payload.owner}/${action.payload.repoName}/stargazers`, null, next,
                ActionTypes.GET_REPO_STARGAZERS);
        case ActionTypes.SEARCH_ORG:
            request.get(`${GithubBaseUri}orgs/${action.payload.orgName}`).end((err, res) => {
                if (!err) {

                    next({
                        type: ActionTypes.ORG_FOUND,
                        payload: {
                            orgName: JSON.parse(res.text).login
                        }
                    });

                    store.dispatch(push(`/${JSON.parse(res.text).login}`));
                } else {
                    next({
                        type: ActionTypes.ORG_NOT_FOUND
                    })
                }
            });
            break;
        default:
            return next(action);

    }
};


const fetchGitHubData = (endpoint, param, next, actionName, byPage) => {
    next({
        type: `${actionName}_INIT`
    });

    let getUri = byPage ? `${GithubBaseUri}${endpoint}?page=${param}` :
        (param ? `${GithubBaseUri}${endpoint}?since=${param}` : `${GithubBaseUri}${endpoint}`);

    return request.get(getUri).end((err, res) => {
        if (err) {
            next({
                type: `${actionName}_FAILURE`
            })
        } else {
            let data = JSON.parse(res.text);
            next({
                type: `${actionName}_SUCCESS`,
                data: data
            })
        }
    });
};

export default GithubApiService;

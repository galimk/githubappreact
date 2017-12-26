import lodash from 'lodash';

const GithubReducer = (state = {
    authContext: {
        isAuthenticated: false,
        accessToken: null,
        userName: null,
        invalidToken: false
    }
}, action) => {


    return state;

};


export default GithubReducer;

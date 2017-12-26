import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {validateToken, loadOrgs, loadRepos, getRepoDetails, getRepoStargazers} from '../actions';
import Auth from './Auth';

class Root extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Auth logOut={this.logOut}
                          authContext={this.props.authContext}
                          validateToken={this.props.validateToken}/>
                    <Route exact path="/" component={DashboardPage}/>
                    <Route path="/repo-details" component={RepoDetailsPage}/>
                </div>
            </Router>
        );
    }


    logOut() {

    }
}

const DashboardPage = () => <span></span>;

const RepoDetailsPage = () => <span></span>;

const mapStateToProps = (state, ownProps) => {
    return {
        authContext: state.GithubReducer.authContext,
        orgs: state.GithubReducer.orgs,
        repos: state.GithubReducer.repos,
        members: state.GithubReducer.members,
        selectedOrgs: state.GithubReducer.selectedOrgs,
        selectedRepo: state.GithubReducer.selectedRepo
    }
};

export default connect(mapStateToProps, {
    validateToken, loadOrgs, loadRepos, getRepoDetails, getRepoStargazers
})(Root);

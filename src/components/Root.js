import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {validateToken, loadOrgs, loadRepos, loadMembers, getRepoDetails, getRepoStargazers, logOut} from '../actions';
import Auth from './Auth';
import GithubList from './GithubList';
import Dashboard from './Dashboard';

class Root extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <div className="row">
                        <Auth logOut={this.props.logOut}
                              authContext={this.props.authContext}
                              validateToken={this.props.validateToken}/>
                    </div>
                    <div className="row">
                        <Route exact path="/" component={Dashboard}/>
                        <Route exact path="/:org_name" component={Dashboard}/>
                        <Route path="/repo-details" component={RepoDetailsPage}/>
                    </div>
                </div>
            </Router>
        );
    }
}

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
    validateToken, loadOrgs, loadRepos, loadMembers, getRepoDetails, getRepoStargazers, logOut
})(Root);

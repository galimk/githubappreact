import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {validateToken, loadOrgs, loadRepos, getRepoDetails, getRepoStargazers} from '../actions';

class Root extends Component {
    render() {
        debugger;
        return (
            <Router>
                <div>
                    <Link to={'repo-details'}>Details</Link>
                    <Link to={'/'}>Dashboard</Link>
                    <Route exact path="/" component={DashboardPage}/>
                    <Route path="/repo-details" component={RepoDetailsPage}/>
                </div>
            </Router>
        );
    }
}

const DashboardPage = () => <h1>Dashboard page....</h1>;

const RepoDetailsPage = () => <h1>This is repo details page...</h1>;

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        orgs: state.orgs,
        repos: state.repos,
        members: state.members,
        selectedOrgs: state.selectedOrgs,
        selectedRepo: state.selectedRepo
    }
};

export default connect(mapStateToProps, {
    validateToken, loadOrgs, loadRepos, getRepoDetails, getRepoStargazers
})(Root);

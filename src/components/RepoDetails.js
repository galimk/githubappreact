import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getRepoDetails, getRepoStargazers} from '../actions';

class RepoDetails extends Component {
    render() {
        if (!this.props.authContext.isAuthenticated)
            return <span></span>;

        return (
            <span></span>
        );
    }

    componentDidMount() {
        debugger;
        if (this.props.authContext.isAuthenticated) {
            this.init();
        }
    }

    componentDidUpdate() {
        if (this.props.authContext.isAuthenticated) {
            this.init();
        }
    }

    init() {
        let repoName = this.props.match.params.repo_name;
        let ownerName = this.props.match.params.owner_name;
        this.props.getRepoDetails(ownerName, repoName);
        this.props.getRepoStargazers(ownerName, repoName);
    }
}


const mapStateToProps = (state) => {
    return {
        authContext: state.GithubReducer.authContext,
    }
};

export default withRouter(connect(mapStateToProps, {
    getRepoDetails, getRepoStargazers
})(RepoDetails));

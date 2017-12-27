import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {loadOrgs, loadRepos, loadMembers, selectOrganization} from '../actions';
import GithubList from './GithubList';

class Dashboard extends Component {
    constructor() {
        super();

        this.organizationItemTemplate = this.organizationItemTemplate.bind(this);
        this.repoItemTemplate = this.repoItemTemplate.bind(this);
        this.memberItemTemplate = this.memberItemTemplate.bind(this);
    }

    render() {
        return (

            <section className="dashBoard">
                {this.props.authContext.isAuthenticated &&
                <GithubList items={this.props.orgs.items}
                            lastSeenId={this.props.orgs.lastSeenId}
                            title="Organizations"
                            loading={this.props.orgs.loading}
                            loadMore={this.props.loadOrgs}
                            templateFn={this.organizationItemTemplate}/>
                }
                {this.props.selectedOrg && this.props.authContext.isAuthenticated &&
                <GithubList items={this.props.repos.items}
                            lastSeenId={this.props.repos.lastSeenId}
                            title="Repositories"
                            orgName={this.props.selectedOrg}
                            loading={this.props.repos.loading}
                            loadMore={(lastSeenId) => this.props.loadRepos(this.props.repos.lastPage,
                                this.props.selectedOrg)}
                            templateFn={this.repoItemTemplate}/>
                }
                {this.props.selectedOrg && this.props.authContext.isAuthenticated &&
                <GithubList items={this.props.members.items}
                            lastSeenId={this.props.members.lastSeenId}
                            title="Members"
                            loading={this.props.members.loading}
                            orgName={this.props.selectedOrg}
                            loadMore={(lastSeenId) => this.props.loadMembers(this.props.members.lastPage,
                                this.props.selectedOrg)}
                            templateFn={this.memberItemTemplate}/>
                }
            </section>
        );
    }

    memberItemTemplate(member) {
        return (
            <tr key={member.id}>
                <td><img className="avatar" src={member.avatar_url}/> {member.login}</td>
            </tr>
        );
    }

    repoItemTemplate(repo) {
        return (
            <tr key={repo.id}>
                <td>{repo.name} ({repo.stargazers_count} stars)</td>
                <td><a onClick={() => this.selectRepo(repo)}>Details</a></td>
            </tr>
        );
    }

    organizationItemTemplate(org) {
        return (
            <tr key={org.id}>
                <td>{org.login}</td>
                <td><a onClick={() => this.selectOrg(org)}>Details</a></td>
            </tr>
        );
    }

    selectOrg(org) {
        this.props.history.push(`${org.login}`);
    }

    selectRepo(repo) {
        this.props.history.push(`repo-details/${repo.name}/${repo.owner}`);
    }

    componentDidUpdate() {
        if (this.props.selectedOrg != this.props.match.params.org_name) {
            this.loadSelectedOrgData();
        }
    }

    componentDidMount() {
        if (this.props.authContext.isAuthenticated) {
            this.props.loadOrgs();
        }

        if (this.props.selectedOrg == null && this.props.match.params.org_name != null) {
            this.loadSelectedOrgData();
        }
    }

    loadSelectedOrgData() {
        this.props.selectOrganization(this.props.match.params.org_name);
        this.props.loadRepos(1, this.props.match.params.org_name);
        this.props.loadMembers(1, this.props.match.params.org_name);
    }
}

const mapStateToProps = (state) => {
    return {
        authContext: state.GithubReducer.authContext,
        orgs: state.GithubReducer.orgs,
        repos: state.GithubReducer.repos,
        members: state.GithubReducer.members,
        selectedOrg: state.GithubReducer.selectedOrg
    }
};

export default withRouter(connect(mapStateToProps, {
    loadOrgs, loadRepos, loadMembers, selectOrganization
})(Dashboard));

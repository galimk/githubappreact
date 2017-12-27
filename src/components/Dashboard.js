import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {loadOrgs, loadRepos, loadMembers, selectOrganization, searchOrganization} from '../actions';
import GithubList from './GithubList';
import OrganizationSearch from './OrganizationSearch';

class Dashboard extends Component {
    isAuthenticatedOnMount = false;

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
                <OrganizationSearch findOrg={this.props.searchOrganization}
                                    orgName={this.props.selectedOrg} orgSearchInvalid={this.props.orgSearchInvalid}/> }

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
                <td><a onClick={() => this.selectOrg(org.login)}>Details</a></td>
            </tr>
        );
    }

    selectOrg(orgName) {
        this.props.history.push(`${orgName}`);
    }

    selectRepo(repo) {
        console.log(repo);
        this.props.history.push(`repo-details/${repo.name}/${repo.owner.login}`);
    }

    componentDidUpdate() {
        if (!this.isAuthenticatedOnMount && this.props.authContext.isAuthenticated) {
            this.props.loadOrgs();
        }

        if (this.props.selectedOrg != this.props.match.params.org_name) {
            this.loadSelectedOrgData();
        }

        if (this.props.switchToOrg !== null) {
            this.selectOrg(this.props.switchToOrg);
        }
    }

    componentDidMount() {
        if (this.props.authContext.isAuthenticated) {
            this.props.loadOrgs();
        }

        if (this.props.selectedOrg == null && this.props.match.params.org_name != null) {
            this.loadSelectedOrgData();
        }

        this.isAuthenticatedOnMount = this.props.authContext.isAuthenticated;
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
        selectedOrg: state.GithubReducer.selectedOrg,
        orgSearchInvalid: state.GithubReducer.orgSearchInvalid,
        switchToOrg: state.GithubReducer.switchToOrg
    }
};

export default withRouter(connect(mapStateToProps, {
    loadOrgs, loadRepos, loadMembers, selectOrganization, searchOrganization
})(Dashboard));

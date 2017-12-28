import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getRepoDetails, getRepoStargazers} from '../actions';

class RepoDetails extends PureComponent {
    render() {
        if (!this.props.authContext.isAuthenticated || this.props.repo == null)
            return <span></span>;

        return (
            <section>
                <div className="row">
                    <div className="col-md-12">
                        <button value="Back" className="btn btn-default pull-right" type="button"
                                onClick={() => window.history.back()}>Back
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="pull-left">{this.props.repo.name}</h3>
                        <h3 className="pull-right">Issues Count: ({this.props.repo.open_issues_count})</h3>
                        <div className="clearfix"></div>
                        <hr/>
                        <h4>{this.props.repo.description}</h4>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-4">
                        <table className="table table-striped">
                            <thead>
                            <th>Stargazers</th>
                            </thead>
                            <tbody>
                            {this.props.stargazers.map(stargazer => (
                                <tr>
                                    <td><img className="avatar" src={stargazer.avatar_url}/> {stargazer.login} </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

        );
    }

    componentDidMount() {
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
        repo: state.GithubReducer.repo,
        stargazers: state.GithubReducer.stargazers
    }
};

export default withRouter(connect(mapStateToProps, {
    getRepoDetails, getRepoStargazers
})(RepoDetails));

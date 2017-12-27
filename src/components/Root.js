import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {validateToken, logOut} from '../actions';
import Auth from './Auth';
import Dashboard from './Dashboard';

import createHistory from 'history/createBrowserHistory'
import {ConnectedRouter} from 'react-router-redux'

const history = createHistory();

class Root extends Component {
    render() {
        return (
            <Router>
                <ConnectedRouter history={history}>
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
                </ConnectedRouter>
            </Router>
        );
    }
}

const RepoDetailsPage = () => <span></span>;

const mapStateToProps = (state) => {
    return {
        authContext: state.GithubReducer.authContext,
    }
};

export default connect(mapStateToProps, {
    validateToken, logOut
})(Root);

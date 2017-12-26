import React from 'react';
import PropTypes from 'prop-types'

const Auth = ({authContext, validateToken, logout}) => {
    const {isAuthenticated, userName, invalidToken} = authContext;

    if (isAuthenticated) {
        return (
            <div className="row">
                <div className="col-md-10">
                    <h3>Github user: {userName}</h3>
                </div>
                <div class="col-md-2">
                    <button type="button" onClick={logout()} class="btn btn-primary">Logout</button>
                </div>
            </div>
        );
    } else {
        return (
            <section>
                <h3>Login to Github</h3>
                <hr/>
                <div className="row">
                    <form>
                        <div className="col-md-10">
                            <div className="form-group">
                                <input type="text" id="token" className="form-control" placeholder="Token"/>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button type="submit"
                                    onClick={() => validateToken(document.getElementById('token').value)}
                                    className="btn btn-primary">Authenticate
                            </button>
                        </div>
                    </form>
                </div>
                {invalidToken &&
                <div className="row">
                    <div className="col-md-12">
                        <span className="error">Invalid token. Try again!</span>
                    </div>
                </div>
                }
            </section>
        )
    }
};


Auth.propTypes = {
    authContext: PropTypes.shape({
        isAuthenticated: PropTypes.bool.isRequired,
        invalidToken: PropTypes.bool.isRequired,
        userName: PropTypes.string
    }),
    validateToken: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired
};


export default Auth;

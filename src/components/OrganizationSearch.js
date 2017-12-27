import React from 'react';
import PropTypes from 'prop-types'


const OrganizationSearch = ({orgName, findOrg, orgSearchInvalid}) => {
    return (
        <div className="row">
            <div className="col-md-4 search-panel">
                <h4>Search organization</h4>
                <div>
                    <div className="form-group left">
                        <input type="organization"
                               className="form-control search-box"
                               id="organization"
                               placeholder="Organization Name"/>
                    </div>
                    <button type="button" onClick={() => findOrg(document.getElementById('organization').value)}
                            className="btn btn-primary search-button">Search
                    </button>
                    <div className="clearfix"></div>
                </div>
                {orgSearchInvalid &&
                <div>
                    <span className="error">Invalid organization. Try again!</span>
                </div>
                }
            </div>
            {orgName &&
            <div className="cold-md-8 info-panel">
                <h4>Selected Organization: <span className="info-panel-organization">{orgName}</span></h4>
            </div>
            }
        </div>
    );
};

OrganizationSearch.propTypes = {
    orgName: PropTypes.string,
    findOrg: PropTypes.func.isRequired,
    orgSearchInvalid: PropTypes.bool
};

export default OrganizationSearch;

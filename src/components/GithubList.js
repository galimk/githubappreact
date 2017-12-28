import React from 'react';
import PropTypes from 'prop-types'


const GithubList = ({items, lastSeenId, loadMore, loading, title, orgName, templateFn}) => {
    return (

        <div className="col-md-4">
            <h4>
                {title} {loading && <span>(loading...)</span>} {orgName}
            </h4>
            <hr/>
            <div className="items-container">
                <table className="table table-striped">
                    <tbody>
                    {items.map(e => templateFn(e))}
                    </tbody>
                    <tfoot>
                    <tr>
                        {lastSeenId != null &&
                        <td colSpan="2">
                            <a onClick={showMore}>Show more...</a>
                        </td>
                        }
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );

    function showMore(e) {
        e.preventDefault();
        loadMore(lastSeenId);
    }
};


GithubList.propTypes = {
    items: PropTypes.array.isRequired,
    lastSeenId: PropTypes.number,
    loadMore: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    orgName: PropTypes.string,
    templateFn: PropTypes.func.isRequired

};

export default GithubList;

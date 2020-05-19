import React , { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'; 

class ActionsBar extends Component {

    render () {
        return (
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        <span>
                            <Link className="button" to={`/courses/${this.props.match}/update`}>Update Course</Link>
                            <Link className="button" to="/courses">Delete Course</Link>
                        </span>
                        <Link className="button-secondary" to="/courses">Return to List</Link>
                    </div>
                </div>
            </div>
        );
    }
};

export default withRouter (ActionsBar); 
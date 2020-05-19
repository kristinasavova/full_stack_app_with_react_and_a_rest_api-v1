import React , { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'; 

class ActionsBar extends Component {

    render () {
        return (
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        <span>
                            <Link to={`/courses/${this.props.match}/update`} className="button">Update Course</Link>
                            <Link to="/courses" className="button">Delete Course</Link>
                        </span>
                        <Link to="/courses" className="button-secondary">Return to List</Link>
                    </div>
                </div>
            </div>
        );
    }
};

export default withRouter (ActionsBar); 
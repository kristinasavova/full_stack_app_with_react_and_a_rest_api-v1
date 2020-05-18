import React from 'react'; 
import { Link, withRouter } from 'react-router-dom';

const Course = withRouter (props => {

    return (
        <div className="grid-33">
            <Link className="course--module course--link" to={`/courses/${props.key}`}>
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{props.title}</h3>
            </Link>
        </div>
    );
});

export default Course;
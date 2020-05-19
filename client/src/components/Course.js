import React from 'react'; 
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const Course = withRouter ( (props) => {

    return (
        <div className="grid-33">
            <Link className="course--module course--link" to={`/courses/${props.id}`}>
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{props.title}</h3>
            </Link>
        </div>
    );
});

Course.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
};

export default Course;
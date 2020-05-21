import React, { Component } from 'react';  
import { Link, withRouter } from 'react-router-dom';

class CourseDetail extends Component {

    state = {
        course: {}
    };

    componentDidMount () { 
        this.props.context.data.getCourse (this.props.match.params.id)
            .then (course => {
                if (course) {
                    this.setState ( () => {
                        return { course };
                    });
                } else {
                    this.props.history.push ('/notfound'); 
                }
            })
            .catch (error => {
                console.log (error);
                this.props.history.push ('/error'); 
            });
    };

    render () {
        const { title, description, estimatedTime, materialsNeeded } = this.state.course;
        const { id } = this.props.match.params;
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <span>
                                <Link to={`/courses/${id}/update`} className="button">Update Course</Link>
                                <Link to="/courses" className="button">Delete Course</Link>
                            </span>
                        <Link to="/courses" className="button button-secondary">Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{title}</h3>
                            <p>{`By ${title} ${title}`}</p>
                        </div>
                        <div className="course--description">
                            <p>{description}</p>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        <li>{materialsNeeded}</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default withRouter (CourseDetail); 
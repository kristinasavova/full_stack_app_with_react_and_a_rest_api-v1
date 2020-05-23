import React, { Component } from 'react';  
import { Link, withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

class CourseDetail extends Component {

    state = {
        course: {},
        teacher: {}
    };

    componentDidMount () { 
        this.props.context.data.getCourse (this.props.match.params.id)
            .then (course => {
                /* Redirects to /notfound if the requested course isn't returned from the REST API. */
                if (course === null) {
                    this.props.history.push ('/notfound');
                } else {
                    this.setState ( () => {
                        return { course, teacher: course.teacher };
                    });
                }
            })
            .catch (error => {
                console.log (error);
                this.props.history.push ('/error'); 
            });
    };

    /**
     * A method to delete a course
     */
    delete = () => {
        const { authUser, password } = this.props.context;
        const courseID = this.props.match.params.id; 
        this.props.context.actions.deleteCourse (courseID, authUser.username, password)
            .catch (error => {
                console.log (error);
                this.props.history.push ('/error');
            });
    };

    render () {

        const { title, description, estimatedTime, materialsNeeded } = this.state.course;
        const { firstName, lastName } = this.state.teacher;
        const { authUser } = this.props.context;
        const { id } = this.props.match.params;
        const markdownDescription = `${description}`;
        const markdownMaterialsNeeded = `${materialsNeeded}`;

        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            { /* Renders the "Update" and "Delete" buttons only if: there's is authenticated 
                            user and user's ID matches that of the user who owns the course. */ }
                            { authUser && authUser.id === this.state.teacher.id ? 
                                <span>
                                    <Link to={`/courses/${id}/update`} className="button">Update Course</Link>
                                    <Link to="/courses" className="button" onClick={this.delete}>Delete Course</Link>
                                </span> : null }
                        <Link to="/courses" className="button button-secondary">Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{title}</h3>
                            <p>By {firstName} {lastName}</p>
                        </div>
                        <div className="course--description">
                            <ReactMarkdown source={markdownDescription} />
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
                                    <ReactMarkdown source={markdownMaterialsNeeded} />
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
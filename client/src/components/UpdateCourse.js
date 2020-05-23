import React, { Component } from 'react'; 
import { withRouter } from 'react-router-dom';
import Form from './Form';

class UpdateCourse extends Component {

    state = {
        course: {
            userId: this.props.context.authUser.id,
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: ''
        },
        errors: []
    };

    componentDidMount () {
        const { authUser } = this.props.context;
        this.props.context.data.getCourse (this.props.match.params.id)
            .then (course => {
                /* Redirect to /notfound if the requested course isn't returned from the REST API. */
                if (course === null) {
                    this.props.history.push ('/notfound');
                /* Redirect to /forbidden if the requested course isn't owned by the authenticated user. */
                } else if (course.teacher.id !== authUser.id) {
                    this.props.history.push ('/forbidden');
                } else {
                    this.setState ( prevState => ({
                        course: { ...prevState.course,
                            title: course.title,
                            description: course.description,
                            estimatedTime: course.estimatedTime,
                            materialsNeeded: course.materialsNeeded
                        }}
                    ));
                }
            })
            /* Redirect to /error if there is a server error. */
            .catch (error => {
                console.log (error);
                this.props.history.push ('/error'); 
            });
    };

    /**
     * A method to cancel updating the course   
     * It changes the current URL to '/courses/:id' and redirects user to another route
     */
    cancel = () => { 
        this.props.history.push (`/courses/${this.props.match.params.id}`);
    };

    /**
     * A method to retrieve values from the inputs and update state with retrieved values 
     * Ref takes a callback func that receives the underlying DOM element as it's argument
     * @param {object} event
     */
    change = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState ( prevState => ({
            course: { ...prevState.course, [name]: value }
        }));
    };

    /**
     * A method to submit the form and update the course   
     * It passes a new course object to the updateCourse method of the context data
     */
    submit = () => {
        const courseID = this.props.match.params.id; 
        const { course } = this.state;
        const { username } = this.props.context.authUser;
        const { password } = this.props.context;
        this.props.context.data.updateCourse (courseID, course, username, password)
            /* Check if there are items in the array (validation errors?) returned by Promise. */
            .then (errors => {
                if (errors) {
                    this.setState ({ errors }); 
                } else {
                    this.props.history.push (`/courses/${this.props.match.params.id}`);  
                }
            })
            /* Handle rejected Promises. */
            .catch (error => {
                console.log (error);
                this.props.history.push ('/error'); 
            });
    };

    render () {

        const { title, description, estimatedTime, materialsNeeded } = this.state.course;
        const { firstName, lastName } = this.props.context.authUser; 

        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <Form 
                    cancel={this.cancel}
                    submit={this.submit}
                    submitButtonText='Update Course'
                    errors={this.state.errors}
                    elements={ () => (    // render prop technique
                        <React.Fragment>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input 
                                        id="title" 
                                        name="title" 
                                        type="text" 
                                        defaultValue={title}
                                        onChange={this.change}
                                        ref={input => this.query = input}
                                        className="input-title course--title--input" 
                                        placeholder="Course title..." />
                                </div>
                                <p>By {firstName} {lastName}</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea 
                                        id="description" 
                                        name="description" 
                                        defaultValue={description}
                                        onChange={this.change}
                                        ref={input => this.query = input}
                                        placeholder="Course description..." /> 
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input 
                                                id="estimatedTime" 
                                                name="estimatedTime" 
                                                type="text" 
                                                defaultValue={estimatedTime}
                                                onChange={this.change}
                                                ref={input => this.query = input}
                                                className="course--time--input"
                                                placeholder="Hours" />
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea 
                                                id="materialsNeeded" 
                                                name="materialsNeeded" 
                                                defaultValue={materialsNeeded}
                                                onChange={this.change}
                                                ref={input => this.query = input}
                                                placeholder="List materials..." />
                                        </div>
                                    </li>
                                </ul>
                            </div> 
                        </div> 
                        </React.Fragment>
                    )}
                /> 
            </div>
        );
    };
};

export default withRouter (UpdateCourse);
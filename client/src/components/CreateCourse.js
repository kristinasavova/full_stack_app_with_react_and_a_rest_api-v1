import React, { Component } from 'react'; 
import { withRouter } from 'react-router-dom';
import Form from './Form';

class CreateCourse extends Component {

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

    /**
     * A method to retrieve values from the inputs and update state with retrieved values 
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
     * A method to cancel creating of the course   
     * It changes the current URL to '/' and redirects user to another route
     */
    cancel = () => {
        this.props.history.push ('/');
    };

    /**
     * A method to submit the form and create a new course   
     * It passes a new course object to the createCourse method of the context data
     */
    submit = () => {
        const { course } = this.state;
        const { username } = this.props.context.authUser;
        const { password } = this.props.context;
        this.props.context.data.createCourse (course, username, password)
            /* Check if there are items in the array (validation errors?) returned by Promise. */
            .then (errors => {
                if (errors) {
                    this.setState ({ errors });
                } else {
                    this.props.history.push ('/courses'); 
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
                <h1>Create Course</h1>
                <Form
                    errors={this.state.errors}
                    cancel={this.cancel}
                    submit={this.submit}
                    submitButtonText='Create Course'
                    elements={() => (       // render prop technique
                    <React.Fragment>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input 
                                        id="title" 
                                        name="title" 
                                        type="text" 
                                        value={title}
                                        onChange={this.change}
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
                                        value={description}
                                        onChange={this.change}
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
                                                value={estimatedTime}
                                                onChange={this.change}
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
                                                value={materialsNeeded}
                                                onChange={this.change}
                                                placeholder="List materials..." />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </React.Fragment>
                )} />     
            </div>
        );
    };
};

export default withRouter (CreateCourse); 
import React, { Component } from 'react'; 
import { withRouter } from 'react-router-dom';
import Form from './Form';

class CreateCourse extends Component {

    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
    };

    change = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState ( () => {
            return { [name]: value };
        });
    };

    cancel = () => {
         /* Change the current URL from '/courses/create' to '/' - redirect user to another route. */
        this.props.history.push ('/');
    };

    submit = () => {
        const { title, description, estimatedTime, materialsNeeded } = this.state;
        const { authenticatedUser, password } = this.props.context;
        /* This course object is going to be passed to the createCourse method. */
        const course = { title, description, estimatedTime, materialsNeeded };
        this.props.context.data.createCourse (course, authenticatedUser.username, password)
            /* Check if there are items in the array (validation errors?) returned by Promise */
            .then (errors => {
                if (errors) {
                    this.setState ({ errors });
                } else {
                    this.props.history.push ('/'); // redirect to the newly created course?
                }
            })
            /* Handle rejected Promises. */
            .catch (error => {
                console.log (error);
                this.props.history.push ('/error');
            });
    };

    render () {

        const { title, description, estimatedTime, materialsNeeded, errors } = this.state;

        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <Form
                    errors={errors}
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
                                <p>By Teacher</p>
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
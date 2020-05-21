import React, { Component } from 'react'; 
import { withRouter } from 'react-router-dom';
import Form from './Form';

class UpdateCourse extends Component {

    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
    };

    cancel = () => { 
        this.props.history.push (`/courses/${this.props.match.params.id}`);
    };

    change = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState ( () => {
            return { [name]: value };
        });
    };

    submit = () => {
        const { title, description, estimatedTime, materialsNeeded } = this.state;
        const { authenticatedUser, password } = this.props.context;
        /* This course object is going to be passed to the updateCourse method. */
        const course = { title, description, estimatedTime, materialsNeeded };
        this.props.context.data.updateCourse (course, authenticatedUser.username, password)
            /* Check if there are items in the array (validation errors?) returned by Promise */
            .then (errors => {
                if (errors) {
                    this.setState ({ errors });
                } else {
                    this.props.history.push ('/courses/${this.props.match.params.id}');  
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
        const { authenticatedUser } = this.props.context; 

        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <Form 
                    cancel={this.cancel}
                    submit={this.submit}
                    submitButtonText='Update Course'
                    errors={errors}
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
                                        value={title}
                                        onChange={this.change}
                                        className="input-title course--title--input" 
                                        placeholder="Course title..." />
                                </div>
                                <p>By {authenticatedUser.firstName} {authenticatedUser.lastName}</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea 
                                        id="description" 
                                        name="description" 
                                        value={description}
                                        onChange={this.change}
                                        placeholder="Course description..." >
                                        Blablabla
                                    </textarea>
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
                                                placeholder="List materials..." >
                                                Blablabla
                                            </textarea>
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
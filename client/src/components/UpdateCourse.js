import React, { Component } from 'react'; 

class UpdateCourse extends Component {

    cancel = event => {
        event.preventDefault (); 
        this.props.history.push (`/courses/${this.props.match.params.id}`);
    };

    render () {
        return (
            <React.Fragment>
                <hr />
                <div className="bounds course--detail">
                    <h1>Update Course</h1>
                    <div>
                        <Form 
                            cancel={this.cancel}>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div>
                                        <input 
                                            id="title" 
                                            name="title" 
                                            type="text" 
                                            className="input-title course--title--input" 
                                            placeholder="Course title..."
                                            value="Build a Basic Bookcase" />
                                    </div>
                                    <p>By Joe Smith</p>
                                </div>
                                <div className="course--description">
                                    <div>
                                        <textarea 
                                            id="description" 
                                            name="description" 
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
                                                    className="course--time--input"
                                                    placeholder="Hours" 
                                                    value="14 hours" />
                                            </div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div>
                                                <textarea 
                                                    id="materialsNeeded" 
                                                    name="materialsNeeded" 
                                                    placeholder="List materials..." >
                                                    Blablabla
                                                </textarea>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Update Course</button>
                                <button className="button button-secondary">Cancel</button> 
                            </div>
                        </Form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

export default UpdateCourse;
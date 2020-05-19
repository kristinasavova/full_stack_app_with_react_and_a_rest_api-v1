import React, { Component } from 'react'; 

class CreateCourse extends Component {

    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: ''
    };

    render () {
        return (
            <React.Fragment>
                <hr />
                <div className="bounds course--detail">
                    <h1>Create Course</h1>
                    <div>
                        <div>
                            <h2 className="validation--errors--label">Validation Errors</h2>
                            <div className="validation-errors">
                                <p>Please provide blabla</p>
                            </div>
                        </div>
                        <form>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value="" /></div>
                                    <p>By Teacher</p>
                                </div>
                                <div className="course--description">
                                    <div><textarea id="description" name="description" placeholder="Course description..."></textarea></div>
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value="" /></div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div><textarea id="materialsNeeded" name="materialsNeeded" placeholder="List materials..."></textarea></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Create Course</button>
                                <button className="button-secondary" onclick="event.preventDefault(); location.href='/courses'">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    };
};

export default CreateCourse; 
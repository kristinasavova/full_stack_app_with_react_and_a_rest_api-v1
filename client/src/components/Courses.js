import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import Course from './Course';
import Header from './Header';

class Courses extends Component {

    state = {
        courses: [],
        errors: []
    };

    componentDidMount () {
        this.props.context.data.getCourses ()
            .then (courses => {
                if (courses) {
                    console.log ('Courses are successfully fetched!');
                    this.setState ( () => {
                        return { courses };
                    });
                } else {
                    this.setState ( () => {
                        return { errors: [ 'Fetching was unsuccessful!' ] };
                    });
                }
            })
            .catch (error => console.log (error));
    };
    
    render () {
        
        const data = this.state.courses; 
        let courses;
        if (data.length > 0) {
            courses = data.map (course => 
            <Course key={course.id} title={course.title} id={course.id} /> ); 
        } 

        return (
            <React.Fragment>
                <hr />
                <div className="bounds">
                    { courses }
                    <div className="grid-33">
                        <Link className="course--module course--add--module" to="/courses/create">
                            <h3 className="course--add--title">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                                </svg>New Course 
                            </h3>
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

export default Courses; 
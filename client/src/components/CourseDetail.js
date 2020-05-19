import React, { Component } from 'react';  
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/* Import components. */
import Header from './Header';
import ActionsBar from './ActionsBar';

class CourseDetail extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        context: PropTypes.object.isRequired
    };

    state = {
        course: null,
        errors: []
    };

    componentDidMount () {
        const { context, match } = this.props;  
        context.actions.getCourse (match.params.id)
            .then (course => {
                if (course) {
                    console.log ('Course is successfully fetched!');
                    this.setState ( () => {
                        return { course };
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
        const { title, teacher, description, estimatedTime, materialsNeeded } = this.state.course;
        return (
            <div>
                <Header />
                <hr />
                <div>
                    <ActionsBar match={this.props.match.params.id} />
                    <div className="bounds course--detail">
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <h3 className="course--title">{title}</h3>
                                <p>{`By ${teacher.firstName} ${teacher.lastName}`}</p>
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
                                        <p>{materialsNeeded}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default withRouter (CourseDetail); 
import React, { Component } from 'react';  
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import withContext from '../Context';
import ActionsBar from './ActionsBar';

const ActionsBarWithContext = withContext (ActionsBar); 

class CourseDetail extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        context: PropTypes.object.isRequired
    };

    state = {
        course: null
    };

    componentDidMount () { 
        this.props.context.data.getCourse (this.props.match.params.id)
            .then (course => {
                this.setState ( () => {
                    return { course };
                });
            })
            .catch (error => console.log (error));
    };

    componentDidUpdate (prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.context.data.getCourse (this.props.match.params.id)
                .then (course => {
                    this.setState ( () => {
                        return { course };
                    });
                })
                .catch (error => console.log (error)); 
        }
    };

    render () {
        const { title, teacher, description, estimatedTime, materialsNeeded } = this.state.course;
        return (
            <React.Fragment>
                <hr />
                <div>
                    <ActionsBarWithContext match={this.props.match.params.id} />
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
            </React.Fragment>
        );
    }
};

export default withRouter (CourseDetail); 
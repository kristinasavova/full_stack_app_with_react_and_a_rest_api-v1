import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import Form from './Form';

class UserSignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
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
        this.props.history.push ('/');
    };

    submit = () => {
        /* Destructure props and state. */
        const { context } = this.props;
        const { firstName, lastName, emailAddress, password, confirmPassword } = this.state;
        /* This user object will be passed to the createUser method. */
        const user = { firstName, lastName, emailAddress, password, confirmPassword };
        context.data.createUser (user) 
            .then (errors => {
                if (errors) {
                    this.setState ({ errors });
                } else {
                    console.log (`${firstName} ${lastName} is successfully signed up and authenticated!`);
                    context.actions.signIn (emailAddress, password)
                        .then ( () => {
                            this.props.history.push ('/');
                        })
                }
            })
            /* Handle rejected Promises. */
            .catch (error => {
                console.log (error);
                this.props.history.push ('/error');
            });
    };

    render () {
        const { firstName, lastName, emailAddress, password, confirmPassword, errors } = this.state;
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <Form 
                        submit={this.submit}
                        cancel={this.cancel}
                        submitButtonText='Sign Up'
                        errors={errors}
                        elements={ () => (
                        <React.Fragment>
                            <div>
                                <input 
                                    id="firstName" 
                                    name="firstName" 
                                    value={firstName}
                                    onChange={this.change}
                                    type="text" 
                                    placeholder="First Name" />
                            </div>
                            <div>
                                <input
                                    id="lastName" 
                                    name="lastName" 
                                    value={lastName}
                                    onChange={this.change}
                                    type="text"
                                    placeholder="Last Name" />
                            </div>
                            <div>
                                <input 
                                    id="emailAddress" 
                                    name="emailAddress" 
                                    value={emailAddress}
                                    onChange={this.change}
                                    type="text" 
                                    placeholder="Email Address" />
                            </div>
                            <div>
                                <input
                                    id="password" 
                                    name="password" 
                                    value={password}
                                    onChange={this.change}
                                    type="password" 
                                    placeholder="Password" />
                            </div>
                            <div>
                                <input
                                    id="confirmPassword" 
                                    name="confirmPassword" 
                                    value={confirmPassword}
                                    onChange={this.change}
                                    type="password" 
                                    placeholder="Confirm Password" />
                            </div>
                        </React.Fragment>
                    )} />
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to='/signin'>Click here</Link> to sign in!</p>
                </div>
            </div>
        );
    };
};

export default UserSignUp;
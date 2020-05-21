import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import Form from './Form';

class UserSignIn extends Component {

    state = {
        emailAddress: '',
        password: '',
        errors: []
    };

    change = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState ( () => {
            return { [name]: value };
        });
    };

    submit = () => {
        const { emailAddress, password } = this.state;
        /* The from variable contains info about the pathname an unauthenticated user redirected from (via this.props.location.state). 
        For example, if user redirects to the sign in page from /settings, from will be equal to pathname: "/settings". 
        If user submits the form without previously visiting a protected route, he will be navigated to /courses by default. */
        const { from } = this.props.location.state || { from: { pathname: '/courses' }};
        this.props.context.actions.signIn (emailAddress, password) 
            .then (user => {
                if (user === null) {
                    this.setState ( () => {
                        return { errors: [ 'Sign-in was unsuccessful' ]};
                    });
                } else {
                    this.props.history.push (from); 
                    console.log (`SUCCESS! ${emailAddress} is now signed in!`);
                }
            })
            .catch (error => {
                console.log (error);
                this.props.history.push ('/error'); 
            });
    };

    cancel = () => {
        this.props.history.push ('/'); 
    };

    render () {

        const { emailAddress, password, errors } = this.state; 

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <Form 
                        submit={this.submit}
                        cancel={this.cancel}
                        errors={errors}
                        submitButtonText='Sign In'
                        elements={() => (   // render prop technique
                        <React.Fragment>
                            <div>
                                <input 
                                    id="emailAddress" 
                                    name="emailAddress" 
                                    type="text" 
                                    value={emailAddress}
                                    onChange={this.change}
                                    placeholder="Email Address" />
                            </div>
                            <div>
                                <input 
                                    id="password" 
                                    name="password" 
                                    type="password" 
                                    value={password}
                                    onChange={this.change}
                                    placeholder="Password" />
                            </div>
                        </React.Fragment>
                    )} />
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to='/signup'>Click here</Link> to sign up!</p>
                </div>
            </div>
        );
    };
};

export default UserSignIn;
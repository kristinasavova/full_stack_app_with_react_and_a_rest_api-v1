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
                    <p>Don't have a user account?
                        <Link to='/signup'>Click here</Link> to sign up!
                    </p>
                </div>
            </div>
        );
    };
};

export default UserSignIn;
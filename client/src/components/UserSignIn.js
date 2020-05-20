import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import Form from './Form';

class UserSignIn extends Component {

    state = {
        username: '',
        password: '',
        errors: []
    };

    render () {
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <Form 
                        elements={() => (   // render prop technique
                        <React.Fragment>
                            <div>
                                <input 
                                    id="emailAddress" 
                                    name="emailAddress" 
                                    type="text" 
                                    placeholder="Email Address" />
                            </div>
                            <div>
                                <input 
                                    id="password" 
                                    name="password" 
                                    type="password" 
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
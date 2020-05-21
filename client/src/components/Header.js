import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';

class Header extends Component {

    render () { 
        const { context } = this.props; 
        const { authenticatedUser }  = context; 
        return (
            <React.Fragment>
                <div className="header">
                    <div className="bounds">
                        <h1 className="header--logo">Courses</h1>
                        <nav>
                            {
                                authenticatedUser ?
                                    <React.Fragment>
                                        <span>Welcome {authenticatedUser.firstName}!</span>
                                        <Link to='/signout' className="signout">Sign Out</Link>
                                    </React.Fragment> :
                                    <React.Fragment>
                                        <Link to='/signup'>Sign Up</Link>
                                        <Link to='/signin'>Sign In</Link>
                                    </React.Fragment>
                            }
                        </nav>
                    </div>
                </div>
                <hr />
            </React.Fragment>
        );
    }
};

export default Header;
import React from 'react'; 
import { Link } from 'react-router-dom';

class Header extends React.PureComponent {

    render () { 
        const { authUser }  = this.props.context; 
        return (
            <React.Fragment>
                <div className="header">
                    <div className="bounds">
                        <h1 className="header--logo">Courses</h1>
                        <nav>
                        {/* Render buttons for signing in and signing up if there's no authenticated user 
                        or the user's first and last name and a button for signing out if there's an authenticated user. */}
                            { authUser ?
                            <React.Fragment>
                                <span>Welcome {authUser.firstName} {authUser.lastName}!</span>
                                <Link to='/signout' className="signout">Sign Out</Link>
                            </React.Fragment> :
                            <React.Fragment>
                                <Link to='/signup'>Sign Up</Link>
                                <Link to='/signin'>Sign In</Link>
                            </React.Fragment> }
                        </nav>
                    </div>
                </div>
                <hr />
            </React.Fragment>
        );
    }
};

export default Header;
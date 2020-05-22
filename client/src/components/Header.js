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
                            {
                                authUser ?
                                    <React.Fragment>
                                        <span>Welcome {authUser.firstName}!</span>
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
import React, { Component } from 'react'; 

class Header extends Component {

    render () { 
        return (
            <React.Fragment>
                <div className="header">
                    <div className="bounds">
                        <h1 className="header--logo">Courses</h1>
                        <nav>
                            <span>Welcome Luna!</span>
                            <a className="signout" href="index.html">Sign Out</a>
                        </nav>
                    </div>
                </div>
                <hr />
            </React.Fragment>
        );
    }
};

export default Header;
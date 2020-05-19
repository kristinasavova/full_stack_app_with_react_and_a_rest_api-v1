import React from 'react'; 

export default class Header extends React.PureComponent {

    render () {
        
        return (
            <div className="header">
                <div className="bounds">
                    <h1 className="header--logo">Courses</h1>
                    <nav>
                        <span>Welcome Luna!</span>
                        <a className="signout" href="index.html">Sign Out</a>
                    </nav>
                </div>
            </div>
        );
    }
}
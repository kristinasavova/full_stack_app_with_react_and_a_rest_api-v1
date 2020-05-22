import React from 'react'; 
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <React.Fragment>
            <hr />
            <div className="bounds">
                <h1>Not Found</h1>
                <p>Sorry! We couldn't find the page you're looking for.</p>
                <p>&nbsp;</p>
                <Link to="/courses" className="button button-secondary">Return to List</Link>
            </div>
        </React.Fragment>
    );
};

export default NotFound;
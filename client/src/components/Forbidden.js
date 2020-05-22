import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {
    return (
        <div className="bounds">
            <h1>Forbidden</h1>
            <p>Oh oh! You can't access this page.</p>
            <p>&nbsp;</p>
            <Link to="/courses" className="button button-secondary">Return to List</Link>
        </div>
    );
};

export default Forbidden;
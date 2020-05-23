import React from 'react';
import { Redirect } from 'react-router-dom';

/* Sign out the authenticated user and redirect to '/'. */
const UserSignOut = ({ context }) => {
    context.actions.signOut ();
    return (
        <Redirect to='/' />
    );
};

export default UserSignOut;
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from './Context';

const PrivateRoute = ({ component: Component, ...otherProps }) => {
    const authUser = useContext (Context).authUser;
    return (
        /* If the user is authenticated, the component gets rendered. If not, redirect to /signin. */
        <Route { ...otherProps } render={ props => (
            authUser ? 
                <Component { ...props } /> : 
                /* The state property holds info about the user's current location (browser URL). 
                If authentication is successful, the router can redirect the user back to the original location (from: props.location). */
                <Redirect to={{
                    pathname: '/signin',
                    state: { from: props.location }
                }} />
            )}
        />
    )
};
        
export default PrivateRoute;

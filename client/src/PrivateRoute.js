import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from './Context';

/**
 * A higher-order component for any routes that should be protected and accessible to authenticated users only 
 * The component will either allow the user to continue to the specified private component, or redirect them to /signin 
 * @param {object} component - a React component
 * @param {*} ...otherProps - all the props of the component 
 * @returns {function} - a higher-order component
 */
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

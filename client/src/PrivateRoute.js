import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Consumer from './Context';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        /* <Consumer> component subscribes PrivateRoute to all the actions and data provided by Context.js. */
        <Consumer>
            { context => (
                <Route 
                    { ...rest }
                    /* If the user is authenticated, the component gets rendered. If not, redirect to /signin. */
                    render={ props => context.authenticatedUser ? (
                        <Component { ...props } />
                    ) : (
                        /* The state property holds info about the user's current location (browser URL). 
                        If authentication is successful, the router can redirect the user back to the original location (from: props.location). */
                        <Redirect to={{
                            pathname: '/signin',
                            state: { from: props.location }
                        }} />
                    )}
                />
            )}
        </Consumer>
    );
};

export default PrivateRoute;

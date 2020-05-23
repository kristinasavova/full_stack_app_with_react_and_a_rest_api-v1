import React, { Component } from 'react'; 
import Cookies from 'js-cookie'; 
import Data from './Data';

/* Context is used when data needs to be accessible by many components at different nesting levels. 
Context lets you pass data through the component tree without having to pass props down manually at every level. */
export const Context = React.createContext ();

export class Provider extends Component {

    constructor () {
        super ();
        this.data = new Data ();
        this.state = { 
            authUser: Cookies.getJSON ('authUser') || null,
            password: Cookies.getJSON ('password') || null
        };
    };

    /* Use credentials to call the getUser method in Data.js. */
    signIn = async (username, password) => {
        const user = await this.data.getUser (username, password);
        if (user !== null) {
            this.setState ( () => {
                return { authUser: user, password };
            });
            /* Create a cookie that stores the authenticated user's data. The first argument specifies the name of the cookie to set, 
            the second one specifies the value to store. The last argument sets additional cookie options -- for example, an expiration. 
            The value 1, for example, creates a cookie that expires 1 day from now. */
            Cookies.set ('authUser', JSON.stringify (user), { expires: 1 });
            Cookies.set ('password', JSON.stringify (password), { expires: 1 });
        }
        return { user, password }; 
    };

    signOut = () => {
        /* Remove the name and username properties from state – the user is no longer authenticated. */
        this.setState ( () => {
            return { authUser: null, password: null };
        });
        /* Delete the authenticatedUser cookie when a user signs out. */
        Cookies.remove ('authUser'); 
        Cookies.remove ('password'); 
    };

    render () {
        const { authUser, password } = this.state;
        /* Value represents an object containing the context to be shared throughout the component tree. */
        const value = { 
            authUser, 
            password,
            data: this.data,
            actions: { 
                signIn: this.signIn,
                signOut: this.signOut,
            }
        };
        
        return (
            <Context.Provider value={value} >
                {this.props.children}
            </Context.Provider>
        );
    }
};

export const Consumer = Context.Consumer; 

/**
 * A higher-order component that wraps the provided component in a Context Consumer - automatically 
 * subscribes the component passed to it to all actions and context changes
 * @param {class} Component - a React component
 * @returns {function} - a higher-order component
 */
export default function withContext (Component) {
    return function ContextComponent (props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} /> }
            </Context.Consumer>
        );
    };
};
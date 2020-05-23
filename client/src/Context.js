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
            password: Cookies.getJSON ('password') || null,
            courses: []
        };
    };

    /**
     * A method to retrieve courses and update state with obtained data
     */
    getCourses = async () => {
        const courses = await this.data.getCourses ();
        if (courses !== null) {
            this.setState ( () => {
                return { courses };
            });
        } else {
            throw new Error ();
        }
    };

    /**
     * A method to delete a course and update state calling getCourses method
     * @param {integer} ID - ID of the course to delete
     * @param {string} username - user's email address
     * @param {string} password - user's password
     */
    deleteCourse = async (ID, username, password) => {
        await this.data.deleteCourse (ID, username, password);
        await this.getCourses ();
    };

    /**
     * A method to sign in a user using user's credentials 
     * @param {string} username - user's email address
     * @param {string} password - user's password
     */
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

    /**
     * A method to remove the user from state and delete the authUser cookie when user signs out
     */
    signOut = () => {
        this.setState ( () => {
            return { authUser: null, password: null };
        });
        Cookies.remove ('authUser'); 
        Cookies.remove ('password'); 
    };

    render () {
        const { authUser, password, courses } = this.state;
        /* Value represents an object containing the context to be shared throughout the component tree. */
        const value = { 
            authUser, 
            password,
            courses,
            data: this.data,
            actions: { 
                signIn: this.signIn,
                signOut: this.signOut,
                getCourses: this.getCourses,
                deleteCourse: this.deleteCourse
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
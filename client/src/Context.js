import React, { Component } from 'react'; 
import Cookies from 'js-cookie'; 
import Data from './Data';

/* Context is used when data needs to be accessible by many components at different nesting levels. 
Context lets you pass data through the component tree without having to pass props down manually at every level. */
const Context = React.createContext ();

export class Provider extends Component {

    constructor () {
        super ();
        this.data = new Data ();
        this.state = { 
            authUser: Cookies.getJSON ('authUser') || null,
            courses: []
        };
    }

    render () {
        
        /* Value represents an object containing the context to be shared throughout the component tree. */
        const value = { 
            authUser: this.state.authUser, 
            courses: this.state.courses, 
            data: this.data, 
            actions: {} 
        };
        
        return (
            <Context.Provider value={value} >
                {this.props.children}
            </Context.Provider>
        );
    }

    getCourses = async () => {
        const courses = await this.data.getCourses ()
        this.setState ( () => {
            return { courses };
        });
        return courses;
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
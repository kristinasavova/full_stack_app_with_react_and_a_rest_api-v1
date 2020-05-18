import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'; 
import withContext from './Context'; 

import Courses from './components/Courses'; 
import CourseDetail from './components/CourseDetail';

/* Connect the components to the context. */
const CoursesWithContext = withContext (Courses); 
const CourseDetailWithContext = withContext (CourseDetail); 

export default () => (

    <BrowserRouter>
        <Switch>
            <Route exact to='/' render={() => <Redirect to='/courses' /> } />
            <Route to='/courses' component={CoursesWithContext} />
            <Route to='/courses/create' component={} />
            <Route to='/courses/:id' render={({match}) => <CourseDetailWithContext match={match} /> }/>
        </Switch>
    </BrowserRouter>
);

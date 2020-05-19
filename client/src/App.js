import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import withContext from './Context'; 

import Header from './components/Header';
import Courses from './components/Courses'; 
import CourseDetail from './components/CourseDetail';
import NotFound from './components/NotFound';

/* Connect the components to the context. */
const CoursesWithContext = withContext (Courses); 
const CourseDetailWithContext = withContext (CourseDetail); 

const App = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route exact to='/courses' component={CoursesWithContext} />
                <Route to='/courses/create' component={NotFound} />
                <Route to='/courses/:id' render={({match}) => <CourseDetailWithContext match={match} /> }/>
                <Route to='/courses/:id/update' component={NotFound} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default App; 

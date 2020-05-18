import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import withContext from './Context'; 

import Courses from './components/Courses'; 

/* Connect the components to the context. */
const CoursesWithContext = withContext (Courses); 

export default () => (

    <BrowserRouter>
        <div>
            <p>Something gets rendered!</p>
            <CoursesWithContext />
        </div>
        <div>
            <Switch>
                <Route to='/' component={CoursesWithContext} />
            </Switch>
        </div>
    </BrowserRouter>
);

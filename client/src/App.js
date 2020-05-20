import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'; 
import withContext from './Context'; 

/* Import components. */
import Header from './components/Header';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import Courses from './components/Courses'; 
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Error from './components/Error';
import NotFound from './components/NotFound';

/* Connect the components to the context. */
const UserSignUpWithContext = withContext (UserSignUp);
const UserSignInWithContext = withContext (UserSignIn); 
const CoursesWithContext = withContext (Courses); 
const CourseDetailWithContext = withContext (CourseDetail); 
const CreateCourseWithContext = withContext (CreateCourse);
const UpdateCourseWithContext = withContext (UpdateCourse);

const App = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route exact path='/' render={() => <Redirect to='/courses' /> } /> 
                <Route exact path='/courses' component={CoursesWithContext} />
                <Route path='/signup' component={UserSignUpWithContext} />
                <Route path='/signin' component={UserSignInWithContext} />
                <Route path='/courses/create' component={CreateCourseWithContext} />
                <Route exact path='/courses/:id' render={({match}) => <CourseDetailWithContext match={match} /> }/>
                <Route path='/courses/:id/update' render={({match}) => <UpdateCourseWithContext match={match} /> } />
                <Route path='/error' component={Error} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default App; 

import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'; 
import withContext from './Context'; 
import PrivateRoute from './PrivateRoute';

/* Import components. */
import Header from './components/Header';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Courses from './components/Courses'; 
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Error from './components/Error';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';

/* Connect the components to the context. */
const UserSignUpWithContext = withContext (UserSignUp);
const UserSignInWithContext = withContext (UserSignIn); 
const UserSignOutWithContext = withContext (UserSignOut);
const HeaderWithContext = withContext (Header);
const CoursesWithContext = withContext (Courses); 
const CourseDetailWithContext = withContext (CourseDetail); 
const CreateCourseWithContext = withContext (CreateCourse);
const UpdateCourseWithContext = withContext (UpdateCourse);

const App = () => (
    <BrowserRouter>
        <div>
            <HeaderWithContext />
            <Switch>
                <Route exact path='/' render={() => <Redirect to='/courses' /> } /> 
                <Route exact path='/courses' component={CoursesWithContext} />
                <Route path='/signup' component={UserSignUpWithContext} />
                <Route path='/signin' component={UserSignInWithContext} />
                <Route path='/signout' component={UserSignOutWithContext} />
                <PrivateRoute path='/courses/create' component={CreateCourseWithContext} />
                <Route exact path='/courses/:id' render={({match}) => <CourseDetailWithContext match={match} /> }/>
                <Route path='/courses/:id/update' component={({match}) => <UpdateCourseWithContext match={match} /> } />
                <Route path='/error' component={Error} />
                <Route path='/forbidden' component={Forbidden} />
                <Route path='/notfound' component={NotFound} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default App; 

import config from './config';

/* A helper class that provides utility methods to allow the React client to talk to the Express server. */
export default class Data {

    /* A method that makes the GET and POST requests to the REST API. */
    api (path, method = 'GET', body = null, requireAuth = false, credentials = null) {
        
        /* Configures the req path using the base URL defined in config.js, which gets passed to the returned fetch method */
        const URL = config.apiURL + path; 
        const options = { method, headers: { 'Content-Type': 'application/json; charset=utf-8' } }; 

        if (body !== null) {
            options.body = JSON.stringify (body); 
        }

        /* Check if an endpoint (or route) requires user authentication. */
        if (requireAuth) {
            /* The btoa method creates a base-64 encoded ASCII string from data. */
            const encodedCredentials = btoa (`${credentials.username}:${credentials.password}`);
            /* Set an Authorization header on each req that requires authentication by adding an Authorization property to the headers object. */
            options.headers['Authorization'] = `Basic ${encodedCredentials}`; 
        }
        /* An optional second parameter: a configuration object that lets control a number of different settings that can be applied to the req. */
        return fetch (URL, options); 
    }

    /**
     * A method to makes a GET req to the /courses endpoint to obtain the list of courses
     */
    async getCourses () {
        const response = await this.api ('/courses', 'GET');
        if (response.status === 200) {
            return response.json ().then (data => data); 
        } else {
            throw new Error ('Error fetching data from server');
        }
    }
};
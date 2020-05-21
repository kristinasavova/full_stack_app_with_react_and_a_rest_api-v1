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
     * Makes a GET req to the /users endpoint and return a JSON object containing user credentials
     * @param {string} username - user's email address
     * @param {string} password - user's password
     */
    async getUser (username, password) {
        const response = await this.api ('/users', 'GET', null, true, { username, password });
        if (response.status === 200) {
            return response.json ().then (data => data); 
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error ();
        }
    };

    /**
     * Makes a POST request, sending new user data to the /users endpoint
     * @param {object} user 
     */
    async createUser (user) {
        const response = await this.api ('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json ().then (data => { return data.errors });
        } else {
            throw new Error (); 
        }
    };

    /**
     * A method to makes a GET req to the /courses endpoint to obtain the list of courses
     */
    async getCourses () {
        const response = await this.api ('/courses', 'GET');
        if (response.status === 200) {
            return response.json ().then (data => data); 
        } else {
            throw new Error ();
        }
    };

    /**
     * A method to makes a GET req to the /courses/:id endpoint to obtain a course
     * @param {integer} ID - ID of the course to get  
     */
    async getCourse (ID) {
        const response = await this.api (`/courses/${ID}`, 'GET');
        if (response.status === 200) {
            return response.json ().then (data => data);
        } else if (response.status === 404) {
            return response.json ().then (data => { return data.errors });
        } else {
            throw new Error (); 
        }
    };

    /**
     * A method to makes a GET req to the /courses/:id endpoint to obtain a course
     * @param {object} data - data of the new course 
     */
    async createCourse (data, username, password) {
        const response = await this.api ('/courses', 'POST', data, true, { username, password }); 
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json ().then (data => { return data.errors });
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error ();
        }
    }
};
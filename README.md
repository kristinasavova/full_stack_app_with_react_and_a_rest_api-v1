# Full Stack App with React and a REST API

This full stack application provides a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, viewing detail for a specific course, as well as creating, updating and deleting courses in the database. In addition, the project requires users to create an account and sign in to make changes to the database. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Installing

In order to install the required dependencies and create the application database, run these commands:
```
cd api
npm install
npm run seed
```
You'll find in the api folder a SQLite database file named `fsjstd-restapi.db`. To run the Node.js Express application, run the command: 
```
npm start
```  
In another terminal or command window install the required dependencies for the client and run the application:
```
cd client
npm install
npm start
```

## Built With

* [React](https://reactjs.org/) 
* [React Router](https://reacttraining.com/react-router/) 
* [React Context API](https://reactjs.org/docs/context.html) 
* [Node.js](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
* [Sequelize ORM](https://sequelize.org/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [TREEHOUSE](https://teamtreehouse.com) 

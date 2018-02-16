//mkdir muber, cd muber, npm i --save express mongoose mocha nodemon
//create app.js, index.js

//TESTS
//make folder test, app_test.js file
//npm i --save supertest
//make test script in package.json, "test": "nodemon --exec mocha"


//make folder routes, file routes.js
//request handling logic will be in controllers folder, make drivers_controller.js file (usually one controller for each type of resource (user, todo))

//make models folder, driver.js file
//npm i --save body-parser, middleware which makes body available on req.body

//set up postman (local server must be running to use it)

//setting up dev vs test environments, will use NODE_ENV variable
//** in test_helper.js, before middleware function is used here to set up test database, not in app.js
//..as part of if else statement. Teacher says this ensures database is connected before tests stares, sometimes
//...mocha (doesn't work great with mongoose) may run tests before connection is established
//..with before middleware, using done we tell mocha not to run any tests until databaes connection is established

//set up all route handlers, except create. setting up geolocation with mongo for that
//mongo suppers lat (x) and long (y), but order is log lat (x an y directions), using geoJSON
//make PointSchema, as a subdocument for the Driver model


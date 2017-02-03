// Author: Erik Smith
// Date: February 1, 2017
// Description: Script is to be used as a server in combination with a mongoDB,
// List of available API calls:
//              General: -/signup
//              API: -/api/authenticate  -/api/newProduct -/api/deleteProduct -/api/products
/////////////////////////////////////////////////////

//
// Imports
//////////
var express = require('express'); // used for redirections
var bodyParser = require('body-parser');
var morgan = require('morgan'); //necessary to console log api calls
var mongoose = require('mongoose'); // library to communicate with mongoDB

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get config file
var User = require('./app/models/user'); // get our mongoose model
var Product = require('./app/models/product'); // get our mongoose model
const util = require('util') // allows for console of entire objects

//
//  Variable declarations
//////////
const TOKEN_EXPIRE_TIME = 60 * 60; //Time before token will expire.
var apiRoutes = express.Router(); // get an instance of the router for api routes
var app = express(); //instantiated route application
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens

//
// Configurations
//////////
mongoose.connect(config.database); // connect to database
app.set('SaltHash', config.SaltHash); // collect hash from config file
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev')); // use morgan to log requests to the console
process.on('uncaughtException', function(err) { //stop server from crashing if it encounters an error
    console.log(err);
});

//
// General APP Routes
//////////

//signup API
app.post('/signup', function(req, res) {

    //Read the parameters passed to the API
    var parsedString = JSON.parse(Object.keys(req.body)[0]);

    //Queue the database for an instance a user with the same name
    User.findOne({
        name: parsedString.name
    }, function(err, user) {

        //Error queuing the DB, respond with error
        if (err) {
            res.json({
                type: false,
                message: "Connection error occured: " + err
            });
        }

        //User does not already exists
        if (!user) {

            //make instance of new user
            var newUser = new User({
                name: parsedString.name,
                password: parsedString.password
            });

            //save to collection
            newUser.save(function(err) {

                //Throw if there is an error
                if (err) throw err;
                console.log('User saved successfully');

                // if user is saved
                // create a token
                var token = jwt.sign(newUser, app.get('SaltHash'), {
                    expiresIn: TOKEN_EXPIRE_TIME // expires in ...
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    name: newUser.name,
                    token: token
                });
            });

          //User already exists, respond with error message
        } else {
            res.json({
                type: false,
                message: "User already exists!"
            });
        }

    });

});

//
// API Routes
//////////

// route to authenticate a user
apiRoutes.post('/authenticate', function(req, res) {

    //Read the parameters passed to the API
    var parsedString = JSON.parse(Object.keys(req.body)[0]);

    // find the user
    User.findOne({
        name: parsedString.name
    }, function(err, user) {

        //error handle
        if (err) throw err;

        //User does not exist
        if (!user) {
            res.json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else if (user) {

            // check if password matches
            if (user.password != parsedString.password) {
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign({
                    tokenUser: user
                }, app.get('SaltHash'), {
                    expiresIn: TOKEN_EXPIRE_TIME // expires in ...
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    name: user.name,
                    token: token
                });
            }

        }

    });
});

// route to add a new product
apiRoutes.post('/newProduct', function(req, res) {

    //Read the parameters passed to the API
    var parsedString = JSON.parse(Object.keys(req.body)[0]);

    // make instance of new product
    var newProduct = new Product({
        name: parsedString.name,
        description: parsedString.description
    });

    //save to collection
    newProduct.save(function(err) {
        if (err) throw err;
        console.log('Product saved successfully');

        // return as successfull addition
        res.json({
            success: true,
            message: "Product saved successfully!"
        });
    });

});

// route to delete a product
apiRoutes.post('/deleteProduct', function(req, res) {

    //Read the parameters passed to the API
    var parsedString = JSON.parse(Object.keys(req.body)[0]);

    //find and delete in the databace where ids match
    Product.findByIdAndRemove(parsedString.id, function(err, offer) {
        //error handing
        if (err) {
            res.json({
                success: false,
                message: 'Error: ' + err
            });
        } else {
            // return if all is successfull
            res.json({
                success: true,
                message: "Deleted Successfully"
            });
        }
    });
});

// route to see all the products in collection
apiRoutes.post('/products', function(req, res) {

    //query the DB for all products
    Product.find(function(err, allProds) {

        //Error handle
        if (err) {
            res.json({
                success: false,
                message: 'Error: ' + err
            });
        } else {
            // return if all is successfull
            res.json({
                success: true,
                message: allProds
            });
        }
    })

});


//
// middleware
//////////

//Middleware for API Routes, Checks if user is authenticated before progressing to API functionality
apiRoutes.use(function(req, res, next) {

    //Read the parameters passed to the API
    var parsedString = JSON.parse(Object.keys(req.body)[0]);

    // check header or url parameters or post parameters for token
    var token = parsedString.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('SaltHash'), function(err, decoded) {

            //Error handle
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

//
// Applying the route paths
//////////
app.use('/api', apiRoutes);


//
// Start the server
//////////
app.listen(port);
console.log('Server is live at http://localhost:' + port);

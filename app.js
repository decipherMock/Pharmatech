require("dotenv").config();

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const cookie = require('cookie-parser')
const flash = require('connect-flash')
const expressLayouts = require('express-ejs-layouts')
const localstrategy = require('passport-local').Strategy
const http = require('http');
const ejs = require('ejs')
const crypto = require('crypto')

var app = express();

const router = express.Router()
var users = require('./routes/user');
var AddDrugsRoute = require('./routes/AddDrugsRoute');
var SaleRoute = require('./routes/SaleRoute');
var CustomerRoute = require('./routes/CustomerRoute');




// var payments = require('./routes/payments');
// const url = 'mongodb+srv://ben:ben@cluster0.0vfl6.mongodb.net/scarpharmacyweb?retryWrites=true&w=majority'

// //const url = 'mongodb://localhost:27017/scarpharmacyweb'


//app.use(enforce.HTTPS({ trustProtoHeader: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false, limit: '25mb'}));



app.use(express.urlencoded({ extended: false }));

//express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24 //1 day
    }
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//conect flash
app.use(flash());

//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error')
    next();
})



app.use('/assets', express.static('Assets'))

app.use(express.json({extended: false, limit: '25mb'}));
app.use(express.urlencoded({extended: false, limit: '25mb'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json())

//Using require pages
app.use('/', users);
app.use('/', AddDrugsRoute);
app.use('/', SaleRoute);
app.use('/', CustomerRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
   console.log(err)
});

// connecting to mongodb


// const url = 'mongodb://ben:ben@cluster0-shard-00-00.0vfl6.mongodb.net:27017,cluster0-shard-00-01.0vfl6.mongodb.net:27017,cluster0-shard-00-02.0vfl6.mongodb.net:27017/scarpharmacyweb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
// mongoose.connect(process.env.MONGODB_URI || url, { useUnifiedTopology: true, useNewUrlParser: true  });

// mongoose.connection.once('open', function() {
//     console.log('connection has ben made')
// }).on('error', function(error) {
//     console.log(error)
// })

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/innovates", {useNewUrlParser: true, useUnifiedTopology: true} );

// mongoose.connection.once('open', function(){
//     console.log('DATABASE CONNECTED!!!. The Scar Plus Application Is Lanuched  Successfully. TO OPEN THE APP, OPEN ANY BROWSER OF CHOICE AND TYPE :http://localhost:5000/ OR USE THE DESKTOP SHORT CUT ON YOUR PC' )
// }).on('error', function(error){
//     console.log('DATABASE CONNECTION FAILURE. MINOR ISSUE OCCURED WHILES STARTING APPLICATION, PLEASE CONTACT US (SCAR TECH) FOR FIXING')
// })


/////////////////////////////////////////////////////////////////////////////////////////////////////////
//const server = app.listen(3000, () => console.log(`Express server listening on port 3000`));
const PORT = 80;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;
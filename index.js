const express =  require("express");
const bodyParser =  require("body-parser");
const UserRoutes =  require("./routes/userRoutes.js");
const path = require('path');
const app = express();

const session = require('express-session')
var FileStore = require('session-file-store')(session);
var fileStoreOptions = {};

app.use(session({ resave: false,saveUninitialized:false,secret: 'awsq45!@#sw$%^)*ewrer&&^$##@$%^&', store: new FileStore(fileStoreOptions),scookie: { maxAge: 60000 }}))

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if(req.method ==='OPTION'){
        //res.header("Access-Control-Allow-Methods", 'GET,POST,PUT,DELETE,PATCH');
       // return res.status(200).json({'method':'GET,POST,PUT,DELETE,PATCH'});
    }
    next();
});

app.use(express.static('./public')); 
//serve all files in the 'public' folder

// Set EJS as templating engine

console.log(path.join(__dirname, ".", "views"));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, ".", "views"));

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
    let isLogin = (req.session.user && req.session.user.email) ? true : false
    let userName = isLogin ? req.session.user.firstName+' '+req.session.user.lastName : ''
  res.render('home', {
     title: "Matrimony Site",
     isLogin: isLogin,
     userName:userName
 });
});

app.get('/logout', function(req, res) {
    let isLogin = (req.session.user && req.session.user.email) ? true : false
    let userName = isLogin ? req.session.user.firstName+' '+req.session.user.lastName : ''
    req.session.destroy(function(err) {
   res.redirect('/');
})
   
});


// profile page
app.get('/profile', function(req, res) {
    let isLogin = (req.session.user && req.session.user.email) ? true : false
    let userName = isLogin ? req.session.user.firstName+' '+req.session.user.lastName : ''
    if(!isLogin)
    {
        res.redirect('/')
    }

  res.render('profile', {
     title: "Matrimony Site",
     isLogin: isLogin,
     user: req.session.user,
     userName:userName
 });
});

// search page
app.get('/search', async function(req, res) {
    let {name='',type='bride'} = req.query
    let searchResult = [];
    let isLogin = (req.session.user && req.session.user.email) ? true : false
    let userName = isLogin ? req.session.user.firstName+' '+req.session.user.lastName : ''
    if(!isLogin)
    {
        //res.redirect('/')
    }
    const user = require('./model/user')
    searchResult = await user.searchPartner(name,type)
    console.log(searchResult)
    res.render('search', {
        title: "Matrimony Site",
        name: name,
        type: type,
        isLogin: isLogin,
        searchResult: searchResult,
        userName:userName
    });
});




// register page
app.get('/register', function(req, res) {
    let isLogin = (req.session.user && req.session.user.email) ? true : false
    let userName = isLogin ? req.session.user.firstName+' '+req.session.user.lastName : ''
    if(isLogin)
    {
        res.redirect('/')
    }
    res.render('register', {
     title: "Register | Shadi Portal",
     isLogin: isLogin,
     userName:userName
 });
});


// login page
app.get('/login', function(req, res) {

    let isLogin = (req.session.user && req.session.user.email) ? true : false
    let userName = isLogin ? req.session.user.firstName+' '+req.session.user.lastName : ''
    if(isLogin)
    {
        res.redirect('/')
    }
    else
    {
        res.render('login', {title: "Login | Shadi Portal",
     isLogin: isLogin,
     userName:userName});
    }
  
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())



app.use("/api/users",UserRoutes);

app.use((req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404)
    next(error)
   });
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
      message: err.message,
      //stack: process.env.NODE_ENV === "production" ? null : null,
    });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
  );
});

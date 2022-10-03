const mongoose = require('mongoose')
require('./config/db')

const express = require('express')
const routes = require('./routes')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser')
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars'); 
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const flash = require('connect-flash');
const passport = require('./config/passport');

require('dotenv').config({path: 'variables.env'})

/* Inicio la aplicación */
const app = express();

//Habilito body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/* Habilito Handlebars */
app.engine('handlebars',
    exphbs.engine({
        handlebars: allowInsecurePrototypeAccess(Handlebars),
        defaultLayout: 'layout',
        helpers:require('./helpers/handlebars')
    })
)
app.set('view engine', 'handlebars'); 

/* Archivos Public */
app.use(express.static(path.join(__dirname, 'public')))


app.use(cookieParser());

app.use(session({
    secret: process.env.SECRETO,
    key: process.env.key,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.URI})
}))

//Alertas y Flashh messages
app.use(flash());


//Inicializar passport 
app.use(passport.initialize());
app.use(passport.session());


//Creamos nuestro middleware
app.use((req,res,next) =>{
    res.locals.mensajes = req.flash(); 
    next();
})


/* Routes */
app.use('/', routes());


/* Inicio el servidor */
const server = process.env.PORT;

app.listen(server, ()=>{
    console.log(`Servidor corriendo en el puerto ${server}`)
})
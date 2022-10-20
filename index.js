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
const createError = require('http-errors')

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

//404-Página no existente
app.use((req,res,next)=>{
    next(createError(404, 'Página no encontrada'))
})

//Administración de errores
app.use((error,req,res) =>{
    res.locals.mensaje = error.message;
    const status = error.status || 500;
    res.locals.status = status;
    res.status(status);
    res.render('error');
})


/* Inicio el servidor */
const host = '0.0.0.0';
const port = process.env.PORT || 4000;

app.listen(port,host, ()=>{
    console.log(`Servidor corriendo en el puerto ${port}`)
})
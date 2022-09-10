const mongoose = require('mongoose')
require('./config/db')

const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo');

require('dotenv').config({path: 'variables.env'})

/* Inicio la aplicación */
const app = express();

/* Habilito Handlebars */
app.engine('handlebars',
    exphbs.engine({
        defaultLayout: 'layout'
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


/* Routes */
app.use('/', routes());


/* Inicio el servidor */
const server = process.env.PORT;

app.listen(server, ()=>{
    console.log(`Servidor corriendo en el puerto ${server}`)
})
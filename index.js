const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const path = require('path')

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


/* Routes */
app.use('/', routes());


/* Inicio el servidor */
const server = 4000;

app.listen(server, ()=>{
    console.log(`Servidor corriendo en el puerto ${server}`)
})
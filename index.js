const express = require('express')
const routes = require('./routes')

const app = express();

app.use('/', routes());


const server = 4000;

app.listen(server, ()=>{
    console.log(`Servidor corriendo en el puerto ${server}`)
})
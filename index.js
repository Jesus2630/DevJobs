const express = require('express')

const app = express();

app.use('/', (req,res)=>{
    res.send('Funcionando')
})


const server = 4000;

app.listen(server, ()=>{
    console.log(`Servidor corriendo en el puerto ${server}`)
})
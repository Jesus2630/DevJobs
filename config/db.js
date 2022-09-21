const mongoose = require('mongoose')
require('dotenv').config({path: 'variables.env'})

mongoose 
    .connect(process.env.URI)
    .then(() => console.log('Base de datos conectada'))
    .catch(() => console.log('Falló la conexión a la base de datos'))


//Importo los modelos
require('../models/Postulaciones')
require('../models/Usuarios')
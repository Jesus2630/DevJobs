const express = require('express')
const router = express.Router();

const homeControllers = require('../controllers/homeControllers');
const vacantesControllers = require('../controllers/vacantesControllers')

module.exports = ()=>{
    router.get('/', homeControllers.mostrarTrabajos)

    //Crear Vacante
    router.get('/vacantes/nueva', vacantesControllers.nuevaVacante);
    router.post('/vacantes/nueva', vacantesControllers.agregarVacante);

    //Mostrar Vacante
    router.get('/vacantes/:url', vacantesControllers.mostrarVacante)

    return router;
}
const express = require('express')
const router = express.Router();

const homeControllers = require('../controllers/homeControllers');
const vacantesControllers = require('../controllers/vacantesControllers')
const usuariosControllers = require('../controllers/usuariosControllers')

module.exports = () => {
    router.get('/', homeControllers.mostrarTrabajos)

    //Crear Vacante
    router.get('/vacantes/nueva', vacantesControllers.nuevaVacante);
    router.post('/vacantes/nueva', vacantesControllers.agregarVacante);

    //Mostrar Vacante
    router.get('/vacantes/:url', vacantesControllers.mostrarVacante)

    //Editar Vacante
    router.get('/vacantes/editar/:url', vacantesControllers.formEditarVacante);
    router.post('/vacantes/editar/:url', vacantesControllers.editarVacante);

    //Crear cuenta
    router.get('/crear-cuenta', usuariosControllers.formCrearCuenta);
    router.post('/crear-cuenta',
        usuariosControllers.validarRegistro,
        usuariosControllers.crearUsuario
    );

    return router;
}
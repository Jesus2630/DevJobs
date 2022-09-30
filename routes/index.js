const express = require('express')
const router = express.Router();

const homeControllers = require('../controllers/homeControllers');
const vacantesControllers = require('../controllers/vacantesControllers');
const usuariosControllers = require('../controllers/usuariosControllers');
const authControllers = require('../controllers/authControllers');

module.exports = () => {
    router.get('/', homeControllers.mostrarTrabajos)

    //Crear Vacante
    router.get('/vacantes/nueva',
        authControllers.verificarUsuario,
        vacantesControllers.nuevaVacante
     );
    router.post('/vacantes/nueva',
        vacantesControllers.agregarVacante,
        authControllers.verificarUsuario
    );

    //Mostrar Vacante
    router.get('/vacantes/:url', vacantesControllers.mostrarVacante)

    //Editar Vacante
    router.get('/vacantes/editar/:url', 
        vacantesControllers.formEditarVacante,
        authControllers.verificarUsuario
    );

    router.post('/vacantes/editar/:url',
        vacantesControllers.editarVacante,
        authControllers.verificarUsuario
    );

    //Crear cuenta
    router.get('/crear-cuenta', usuariosControllers.formCrearCuenta);
    router.post('/crear-cuenta',
        usuariosControllers.validarRegistro,
        usuariosControllers.crearUsuario
    );

    //Autenticación de usuario
    router.get('/iniciar-sesion', usuariosControllers.formIniciarSesion);
    router.post('/iniciar-sesion', authControllers.autenticarUsuario);

    //Panel de administración
    router.get('/administracion',
        authControllers.verificarUsuario,
        authControllers.mostrarPanel
    );


    return router;
}
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
    authControllers.verificarUsuario,
        vacantesControllers.validarVacante,
        vacantesControllers.agregarVacante
    );

    //Mostrar Vacante
    router.get('/vacantes/:url', vacantesControllers.mostrarVacante)

    //Editar Vacante
    router.get('/vacantes/editar/:url', 
        vacantesControllers.formEditarVacante,
        authControllers.verificarUsuario
    );

    router.post('/vacantes/editar/:url',
    authControllers.verificarUsuario,
        vacantesControllers.validarVacante,
        vacantesControllers.editarVacante,
    );

    //Eliminar vacante
    router.delete('/vacantes/eliminar/:id', 
        vacantesControllers.eliminarVacante
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

    //Cerrar sesión
    router.get('/cerrar-sesion',
        authControllers.verificarUsuario,
        authControllers.cerrarSesion
    );

    //Panel de administración
    router.get('/administracion',
        authControllers.verificarUsuario,
        authControllers.mostrarPanel
    );

    //Editar Perfil
    router.get('/editar-perfil',
        authControllers.verificarUsuario,
        usuariosControllers.formEditarPerfil
    )
    router.post('/editar-perfil',
        authControllers.verificarUsuario,
        usuariosControllers.validarPerfil,
        usuariosControllers.editarPerfil
    )


    return router;
}
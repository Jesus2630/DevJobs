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

    //Resetear Password
    router.get('/reestablecer-password',authControllers.formRestablecerPassword)
    router.post('/reestablecer-password',authControllers.enviarToken)

    //Resetear Password (Almacenando en base de datos)
    router.get('/reestablecer-password/:token', authControllers.reestablecerPassword)
    router.post('/reestablecer-password/:token', authControllers.guardarPassword)


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
       /* usuariosControllers.validarPerfil,  */
        usuariosControllers.subirImagen,
        usuariosControllers.editarPerfil
    )

    //Recibir Msj de candidatos
    router.post('/vacantes/:url',
        vacantesControllers.subirCV,
        vacantesControllers.contactar
    )

    //Mostrar los candidatos
    router.get('/candidatos/:id',
        authControllers.verificarUsuario,
        vacantesControllers.mostrarCandidatos
    )

    //Buscar Vacantes
    router.post('/buscador', vacantesControllers.buscarVacantes);

    return router;
}
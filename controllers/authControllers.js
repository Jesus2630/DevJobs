const passport = require('passport');
const mongoose = require('mongoose');
const Vacante  = mongoose.model('Postulacion');
const Usuarios  = mongoose.model('Usuarios')
const crypto    = require('crypto')

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect : '/administracion',
    failureRedirect : '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
}) 


//Reviso si el usuario se encuentra autenticado
exports.verificarUsuario = (req,res,next) =>{

    //Reviso usuario
    if(req.isAuthenticated()){
        return next()
    }

    //Redireccionar
    res.redirect('/iniciar-sesion');

}


exports.mostrarPanel = async(req,res)=>{

    //Consultar el Usuario Autenticado
    const vacantes = await Vacante.find({autor: req.user._id});
    res.render('administracion', {
        nombrePagina: "Panel de administración",
        tagLine: 'Crea y Administra tus vacantes aquí.',
        cerrarSesion: true,
        nombre: req.user.nombre,
        imagen: req.user.imagen,
        vacantes
    })
}

//Cerrar sesión
exports.cerrarSesion = (req,res) =>{
    req.logout(function(err){
        if(err) {
            return next(err);
        }
        req.flash('correcto', 'Sesión cerrada')
        return res.redirect('/iniciar-sesion')
    });
}

//Form Reiniciar Password
exports.formRestablecerPassword = (req,res) =>{
    res.render('reestablecer-password', {
        nombrePagina: 'Restablece tu contraseña',
        tagLine: 'Si te olvidaste tu contraseña coloca tu email para restablecer'
    })
}

//Generar el token en tabla de usuarios
exports.enviarToken = async(req,res) =>{
    const usuario = await Usuarios.findOne({email: req.body.email})

    if(!usuario){
        req.flash('error', 'Cuenta no existente')
        return res.redirect('back');
    }

    //Si existe, generar token
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expira = Date.now() + 3600000;

    //Guardar el usuario
    await usuario.save();
    const resetUrl = `http://${req.headers.host}/reestablecer-password/${usuario.token}`



    req.flash('correcto', 'Revisa tu correo para las indicaciones')
    res.redirect('/iniciar-sesion')
}
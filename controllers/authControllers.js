const passport = require('passport');
const mongoose = require('mongoose');
const Vacante  = mongoose.model('Postulacion');

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
    const vacantes = await Vacante.find({autor: req.user._id})

    res.render('administracion', {
        nombrePagina: "Panel de administración",
        tagLine: 'Crea y Administra tus vacantes aquí.',
        cerrarSesion: true,
        nombre: req.user.nombre,
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
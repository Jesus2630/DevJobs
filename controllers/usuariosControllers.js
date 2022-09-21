const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');

exports.formCrearCuenta = (req,res) =>{
     res.render('crear-cuenta', {
        nombrePagina: 'Crea tu cuenta en Enjobs',
        tagline: 'Publica tus ofertas laborales gratis, solo creando tu cuenta'
     })
}

exports.crearUsuario = async(req,res,next) =>{
    //Crear usuari
    const usuario = new Usuarios(req.body);

    const nuevoUsuario = await usuario.save();

    if(!nuevoUsuario) return next();

    res.redirect('/iniciar-sesion')
}
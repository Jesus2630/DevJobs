const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');
const { body, validationResult } = require('express-validator');

exports.formCrearCuenta = (req,res) =>{
     res.render('crear-cuenta', {
        nombrePagina: 'Crea tu cuenta en Enjobs',
        tagline: 'Publica tus ofertas laborales gratis, solo creando tu cuenta'
     })
}

exports.validarRegistro = async(req,res,next) =>{
    //Sanitizo los campos
    const rules = [
        body('nombre').not().isEmpty().withMessage('El nombre es obligatorio').escape(),
        body('email').isEmail().withMessage('El Email es obligatorio').normalizeEmail(),
        body('password').not().isEmpty().withMessage('El Password el obligatorio').escape(),
        body('confirmar').not().isEmpty().withMessage('Debe confirmar su password').escape(),
        body('confirmar').equals(req.body.password).withMessage('Los passwords no son iguales'),
    ]

    await Promise.all(rules.map(validation => validation.run(req)));
    const errores = validationResult(req);

    //si hay errores
    if (!errores.isEmpty()) {
        req.flash('error', errores.array().map(error => error.msg));
        res.render('crear-cuenta', {
            nombrePagina: 'Crea tu cuenta en Enjobs',
            tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta',
            mensajes: req.flash()
        })
        return;
    }
 
    //si toda la validacion es correcta
    next();
}

exports.crearUsuario = async(req,res,next) =>{
    //Crear usuario
    const usuario = new Usuarios(req.body);
 

    try {
        await usuario.save();
        res.redirect('/iniciar-sesion')
    }catch(error){
        req.flash('error',error); 
        res.redirect('/crear-cuenta')
    }
}

exports.formIniciarSesion = (req,res) => {
    res.render('iniciar-sesion', {
        nombrePagina : 'Iniciar Sesión en Enjobs'
        
    }
    )
}
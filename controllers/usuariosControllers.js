const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');
const { body, validationResult } = require('express-validator');
const shortid = require('shortid');
const multer = require('multer');


//Configuracion Multer
const configuracionMulter = {
    storage : fileStorage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '../../public/uploads/perfiles')
        },
        filename: function (req, file, cb) {
            const extension = file.mimetype.split('/')[1]
            cb(null, `${shortid.generate()}.${extension}`)
        }
      }),
      fileFilter(req,file,cb){
        if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true);
        }else{
            cb(null, false);
        }
      },
      limits: {fileSize: 100000}
} 

const upload = multer(configuracionMulter).single('imagen');

exports.subirImagen = (req,res,next) =>{
    upload(req,res, function(error){
        if(error instanceof multer.MulterError){
            return next();
        }
    })
    next();
}


//Crear cuenta
exports.formCrearCuenta = (req,res) =>{
     res.render('crear-cuenta', {
        nombrePagina: 'Crea tu cuenta en Enjobs',
        tagLine: 'Publica tus ofertas laborales gratis, solo creando tu cuenta'
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
            tagLine: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta',
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

//Inicio de sesión

exports.formIniciarSesion = (req,res) => {
    res.render('iniciar-sesion', {
        nombrePagina : 'Iniciar Sesión en Enjobs'
    }
    )
}

//Editar Perfil
exports.formEditarPerfil = (req,res) =>{
    res.render('editar-perfil', {
        nombrePagina : 'Edita tu pefil de Enjobs',
        usuario: req.user,
        cerrarSesion: true,
        nombre : req.user.nombre         
    })
}

//Guardar los cambios en editar perfil
exports.editarPerfil = async(req,res) =>{
    const usuario = await Usuarios.findById(req.user._id);

    usuario.nombre = req.body.nombre;
    usuario.email  = req.body.email;
    
    if(req.body.password){
        usuario.password = req.body.password
    }

    if(req.file){
        usuario.imagen = req.file.filename;
    }

    await usuario.save();

    req.flash('correcto', 'Cambios guardados correctamente');
    //Redirect
    res.redirect('/administracion');
}

//Sanititzar y validar editar-perfil
exports.validarPerfil = async (req,res,next) =>{
     //Sanitizo los campos
     const rules = [
        body('nombre').not().isEmpty().withMessage('El nombre es obligatorio').escape(),
        body('email').isEmail().withMessage('El Email es obligatorio').normalizeEmail(),
    ]

    await Promise.all(rules.map(validation => validation.run(req)));
    const errores = validationResult(req);

    //si hay errores
    if (!errores.isEmpty()) {
        req.flash('error', errores.array().map(error => error.msg));
        res.render('editar-perfil', {
            nombrePagina : 'Edita tu pefil de Enjobs',
            usuario: req.user,
            cerrarSesion: true,
            nombre : req.user.nombre         
        })
        return;
    }
 
    //si toda la validacion es correcta
    next();
}
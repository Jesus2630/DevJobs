const mongoose = require('mongoose')
const Vacante = mongoose.model('Postulacion');
const { body, validationResult } = require('express-validator');

exports.nuevaVacante = (req,res) =>{
    res.render('nueva-vacante', {
        nombrePagina: 'Nueva Vacante',
        tagLine: 'Publicá tu empleo',
        cerrarSesion: true,
        nombre : req.user.nombre         
    })
}

//Agregar Vacante a base de datos
exports.agregarVacante = async(req,res) =>{
     const vacante = new Vacante(req.body);

     //Usuario que crea la vacante
     vacante.autor = req.user._id;

     //Crear arreglo de habilidades
     vacante.skills = req.body.skills.split(',');

     //Almacenar en base de datos
     const nuevaVacante = await vacante.save()  

     //Redireccionar
     res.redirect(`/vacantes/${nuevaVacante.url}`);
}

//Mostrar Vacante
exports.mostrarVacante = async(req,res,next) =>{
     const vacante = await Vacante.findOne({url: req.params.url});

     //Si no hay
     if(!vacante) return next()

     res.render('vacante', {
        vacante,
        nombrePagina: vacante.titulo,
        barra: true
     })
}

//Editar vacante
exports.formEditarVacante = async(req,res,next) =>{
    const vacante = await Vacante.findOne({url: req.params.url})

    if(!vacante) return next();

    res.render('editar-vacante',{
        vacante,
        nombrePagina: `Editar - ${vacante.titulo}`,
        cerrarSesion: true,
        nombre : req.user.nombre         
    })
}

exports.editarVacante = async(req,res) =>{
    const vacanteActualizada = req.body

    vacanteActualizada.skills = req.body.skills.split(',')

    const vacante = await Vacante.findOneAndUpdate({url: req.params.url},
        vacanteActualizada, {
            new: true,
            runValidators: true,
        });
        res.redirect(`/vacantes/${vacante.url}`)
}


//Validar Vacante
exports.validarVacante = async (req, res, next) => {
    const rules = [
        body("titulo").not().isEmpty().withMessage("Agregar un título a la vacante.").escape(),
        body("empresa").not().isEmpty().withMessage("Agregar el nombre de la empresa").escape(),
        body("ubicacion").not().isEmpty().withMessage("Agregar una ubicación").escape(),
        body("contrato").not().isEmpty().withMessage("Selcciona el tipo de contrato").escape(),
        body("skills").not().isEmpty().withMessage("Selecciona al menos una habilidad").escape(),
      ];
      
      await Promise.all(rules.map((validation) => validation.run(req)));
      const errores = validationResult(req);
  
 
   //si hay errores
   if (errores.length > 0) {
        req.flash('error', errores.array().map(error => error.msg));
        res.render('nueva-vacante', {
            nombrePagina: 'Nueva Vacante',
            tagLine: 'Publicá tu empleo',
            cerrarSesion: true,
            nombre : req.user.nombre,   
            mensajes: req.flash()
    })
    return;
}

    //si toda la validacion es correcta
    next();
}
exports.eliminarVacante = async(req,res) =>{
    const {id} = req.params;

    const vacante = await Vacante.findById(id);

    if(verificarAutor(vacante, req.user)){
        //Si es el usuario eliminar
        vacante.remove()
        res.status(200).send('Vacante Eliminada Correctamente');   
    }else{
        //No permitir
        res.status(403).send('Error')
    }
}


const verificarAutor = (vacante = {}, usuario = {})=>{
    if(!vacante.autor.equals(usuario._id)){
        return false
    }
    return true;
}


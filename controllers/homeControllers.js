 const mongoose = require('mongoose')
 const Vacante = mongoose.model('Postulacion')

exports.mostrarTrabajos = async(req,res,next) =>{

    const vacantes = await Vacante.find().lean();

    if(!vacantes) return next()

    res.render('home', {
        nombrePagina: 'EnJobs',
        tagLine: 'Encuentra y publica empleos',
        barra: true,
        boton: true,
        vacantes: vacantes
    })
}
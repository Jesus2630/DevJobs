exports.mostrarTrabajos = (req,res) =>{
    res.render('home', {
        nombrePagina: 'EnJobs',
        tagLine: 'Encuentra y publica empleos',
        barra: true,
        boton: true,
    })
}
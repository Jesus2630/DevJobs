exports.formCrearCuenta = (req,res) =>{
     res.render('crear-cuenta', {
        nombrePagina: 'Crea tu cuenta en Enjobs',
        tagline: 'Publica tus ofertas laborales gratis, solo creando tu cuenta'
     })
}
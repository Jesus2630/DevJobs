import axios from 'axios';
import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelector('.lista-conocimientos');

    //Limpiar las alertas
    let alertas = document.querySelector('.alertas');

    if(alertas){
        limpiarAlertas();
    }

    if (skills) {
        skills.addEventListener('click', agregarSkill);

        //Llamar función en editar
        skillsSeleccionados();
    }

    const vacantesListado = document.querySelector('.panel-administracion')

    if (vacantesListado){
        vacantesListado.addEventListener('click', accionesListado)
    }
})

const skills = new Set();
const agregarSkill = (e) => {
    if (e.target.tagName === 'LI') {
        if (e.target.classList.contains('activo')) {
            //Quitar Set y Clase
            skills.delete(e.target.textContent);
            e.target.classList.remove('activo');
        }else{
            //Agregar Set y Clase
            skills.add(e.target.textContent);
            e.target.classList.add('activo');
        }
        
    }

    const skillsArray = [...skills]
    document.querySelector('#skills').value = skillsArray;
}

const skillsSeleccionados = () =>{
    const seleccionadas = Array.from(document.querySelectorAll('.lista-conocimientos .activo'));

    seleccionadas.forEach(seleccionada =>{
        skills.add(seleccionada.textContent)
    })

    //Mostrarlo en el Hidden

    const skillsArray = [...skills]
    document.querySelector('#skills').value = skillsArray;
}

const limpiarAlertas = () =>{
    const alertas = document.querySelector('.alertas')
    const interval = setInterval (()=>{
        if(alertas.children.length > 0){
            alertas.removeChild(alertas.children[0])
        } else if (alertas.children.length === 0){
            alertas.parentElement.removeChild(alertas);
            clearInterval(interval);
        }
    }, 2000)
}

//Eliminar vacantes
const accionesListado = e =>{
    e.preventDefault();

    if(e.target.dataset.eliminar){
        //elimino   
        const swalWithBootstrapButtons = Swal.mixin({
            buttonsStyling: true
          })
          
          swalWithBootstrapButtons.fire({
            title: '¿Confirmar?',
            text: "Borrar de forma permanente su vacante",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                const url = `${location.origin}/vacantes/eliminar/${e.target.dataset.eliminar}`; 
                
                axios.delete(url, {params: {url}})
                    .then(function(respuesta){
                        if(respuesta.status === 200){
                            Swal.fire(
                                'Eliminado',
                                respuesta.data,
                                'success'
                            );

                            //Elimino del DOM
                            e.target.parentElement.parentElement.parentElement.removeChild(
                                e.target.parentElement.parentElement
                            )
                        }
                    })
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire(
                'No hubo cambios',
              )
            }
          })
    }else if(e.target.tagName === 'A' ){
        window.location.href = e.target.href;

        return;
    }
}
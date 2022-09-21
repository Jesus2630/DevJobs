module.exports = {
    seleccionarHabilidades: (seleccionadas = [], opciones) =>{


        const skills = ['HTML5', 'CSS3', 'CSSGrid','FlexBox',
        'JavaScript','jQuery','Node','Angular','VueJs', 'ReactJs',
        'React Hooks', 'Redux', 'Apollo', 'GraphQL','TypeScript',
        'PHP', 'Laravel', 'Symfony', 'Python', 'Django', 'ORM',
        'Sequelize','Mongoose','SQL','MVC','SCSS','WordPress'
        ];

        let html = '';
        skills.forEach(skill =>{
            html += `
                <li ${seleccionadas.includes(skill) ? ' class="activo"' : ''}>${skill}</li>
            `;
        })

        return opciones.fn().html = html;
    },
    tipoContrato: (seleccionado, opciones) =>{
         return opciones.fn(this).replace(
            new RegExp(`value =${seleccionado}`), '$& selected="selected"'
        )
    }
}
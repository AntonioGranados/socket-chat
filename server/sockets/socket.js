const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');
const usuarios = new Usuarios();


io.on('connection', (client) => {
    client.on('entrarChat', (data, callback) => {
        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        //Conectar un usuario a una sala
        client.join(data.sala);

        //retorna todos los usuarios conectados al servidor
        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);

        //Este evento se dispara cada vez que una personas entra o sale del chat
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${data.nombre} se unió`));
        callback(usuarios.getPersonasPorSala(data.sala));
    });

    client.on('crearMensaje', (data, callback) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
        callback(mensaje);
    })

    client.on('disconnect', () => {
        let personaEliminada = usuarios.eliminarPersona(client.id);

        client.broadcast.to(personaEliminada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaEliminada.nombre} salió`));

        client.broadcast.to(personaEliminada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaEliminada.sala));
    });

    //Mensajes Privados
    client.on('mensajePrivado', data => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    })

});
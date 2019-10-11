//Clase que se encarga de todos los usuarios conectados
class Usuarios {
    constructor() {
        this.personas = [];
    }

    //Funcion para agregar una persona al chat
    agregarPersona(id, nombre, sala) {
        let persona = {
            id,
            nombre,
            sala
        };

        //Agregamos la persona al array
        this.personas.push(persona);
        return this.personas;
    }

    //Obtener una persona por el id
    getPersona(id) {
        let persona = this.personas.filter(persona => {
            return persona.id === id;
        })[0]; //Se pone 0 para que devuelva el primer resultado de la busqueda

        return persona;
    }

    //Obtener todas las personas
    getPersonas() {
        return this.personas;
    }

    //Obtener a personas en una sala
    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => {
            return persona.sala === sala
        });

        return personasEnSala;

    }

    //Eliminar una persona del chat, puede ser cuando se desconecte o se salga del chat
    eliminarPersona(id) {
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(persona => {
            //regresa todas las personas cuyo id sea diferente al id que se esta enviando y se asigna al arreglo this.persona que tendra solo las personas activas
            return persona.id != id;
        });

        return personaBorrada;

    }


}

module.exports = {
    Usuarios
}
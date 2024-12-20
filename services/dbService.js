import {Usuario, Imagen,Video,Archivo} from '../models/index.js'; 

// Función para buscar usuario por email
const buscarUsuarioPorEmail = async (email) => {
    try {
        const usuario = await Usuario.findOne({
            where: { email },  // Condición de búsqueda
            attributes: { exclude: ['password'] }  // Excluir la contraseña del resultado
        });

        // Verificar si el usuario fue encontrado
        if (!usuario) {
            return { message: 'Usuario no encontrado' };
        }

        return usuario;
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        return { error: 'Ocurrió un error al buscar el usuario' };
    }
};

const crearImagen = async (nombreArchivo, url, usuarioId, ubicacionArchivo) => {
    try {
        const imagen = await Imagen.create({
            nombre_archivo: nombreArchivo,
            url: url,
            usuario_id: usuarioId,
            ubicacion_archivo: ubicacionArchivo
        });
        console.log('Imagen guardada en la base de datos.');
        return imagen;
    } catch (error) {
        console.error('Error al guardar la imagen en la base de datos:', error);
        throw new Error('Error al guardar la imagen en la base de datos');
    }
};

// Función para crear un video en la base de datos
const crearVideo = async (nombreArchivo, url, usuarioId, ubicacionArchivo) => {
    try {
        const video = await Video.create({
            nombre_archivo: nombreArchivo,
            url: url,
            usuario_id: usuarioId,
            ubicacion_archivo: ubicacionArchivo
        });
        console.log('Video guardado en la base de datos.');
        return video;
    } catch (error) {
        console.error('Error al guardar el video en la base de datos:', error);
        throw new Error('Error al guardar el video en la base de datos');
    }
};

// Función para crear un archivo en la base de datos
const crearArchivo = async (nombreArchivo, url, usuarioId, ubicacionArchivo) => {
    try {
        const archivo = await Archivo.create({
            nombre_archivo: nombreArchivo,
            url: url,
            usuario_id: usuarioId,
            ubicacion_archivo: ubicacionArchivo
        });
        console.log('Archivo guardado en la base de datos.');
        return archivo;
    } catch (error) {
        console.error('Error al guardar el archivo en la base de datos:', error);
        throw new Error('Error al guardar el archivo en la base de datos');
    }
};

// Función para buscar imágenes de un usuario
const buscarImagenesdb = async (usuarioId) => {
    try {
        const imagenes = await Imagen.findAll({
            where: { usuario_id: usuarioId }  // Condición de búsqueda
        });

        // Verificar si se encontraron imágenes
        if (imagenes.length === 0) {
            return { message: 'No se encontraron imágenes' };
        }

        return imagenes;
    } catch (error) {
        console.error('Error al buscar imágenes:', error);
        return { error: 'Ocurrió un error al buscar imágenes' };
    }
};

// Función para buscar videos de un usuario
const buscarVideosdb = async (usuarioId) => {
    try {
        const videos = await Video.findAll({
            where: { usuario_id: usuarioId }  // Condición de búsqueda
        });

        // Verificar si se encontraron videos
        if (videos.length === 0) {
            return { message: 'No se encontraron videos' };
        }

        return videos;
    } catch (error) {
        console.error('Error al buscar videos:', error);
        return { error: 'Ocurrió un error al buscar videos' };
    }
};

// Función para buscar archivos de un usuario
const buscarArchivosdb = async (usuarioId) => {
    try {
        const archivos = await Archivo.findAll({
            where: { usuario_id: usuarioId }  // Condición de búsqueda
        });

        // Verificar si se encontraron archivos
        if (archivos.length === 0) {
            return { message: 'No se encontraron archivos' };
        }

        return archivos;
    } catch (error) {
        console.error('Error al buscar archivos:', error);
        return { error: 'Ocurrió un error al buscar archivos' };
    }
};

const crearUsuario = async (name, surname, email, phone, password, cedula, usertype) => {
    try {
        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return { message: 'El usuario con ese email ya está registrado' };
        }

        // Crear el nuevo usuario
        const nuevoUsuario = await Usuario.create({
            name,
            surname,
            email,
            phone,
            password,
            cedula,
            usertype
        });

        console.log('Usuario creado correctamente en la base de datos.');
        return { message: 'Usuario creado correctamente', usuario: nuevoUsuario };
    } catch (error) {
        console.error('Error al crear el usuario en la base de datos:', error);
        throw new Error('Error al crear el usuario en la base de datos');
    }
};

const editarUsuario = async (email, name, surname, phone, cedula) => {
    try {
        // Buscar el usuario por email
        const usuario = await Usuario.findOne({ where: { email } });

        // Verificar si el usuario fue encontrado
        if (!usuario) {
            return { message: 'Usuario no encontrado' };
        }

        // Actualizar los campos permitidos
        usuario.name = name;
        usuario.surname = surname;
        usuario.phone = phone;
        usuario.cedula = cedula;

        // Guardar los cambios en la base de datos
        await usuario.save();

        console.log('Usuario actualizado correctamente en la base de datos.');
        return { message: 'Usuario actualizado correctamente', usuario };
    } catch (error) {
        console.error('Error al actualizar el usuario en la base de datos:', error);
        throw new Error('Error al actualizar el usuario en la base de datos');
    }
};


export {
    buscarUsuarioPorEmail,
    crearImagen,
    crearArchivo,
    crearVideo,
    buscarImagenesdb,
    buscarArchivosdb,
    buscarVideosdb,
    crearUsuario,
    editarUsuario

}

import fs from 'fs'; 
import path from 'path';
//import {Archivo, Imagen, Video} from '../models/index.js';
import client from '../services/grpcService.js';
import { decodificarJWT } from '../helpers/token.js';
import { buscarUsuarioPorEmail,crearImagen,crearVideo,crearArchivo,buscarArchivosdb,buscarVideosdb,buscarImagenesdb } from '../services/dbService.js';
import Imagen from '../models/Imagen.js';

const BASE_URL = 'http://sistema3.bucaramanga.upb.edu.co:4000/uploads';

// Función para subir imágenes
const uploadImage = async (req, res) => {
    console.log('Iniciando uploadImage');

    const { token } = req.params;
    console.log('Token:', token);

    if (!token) {
        console.error("Token no proporcionado en la URL");
        return res.status(400).json({ error: "Token no proporcionado en la URL" });
    }

    let decodedToken;
    try {
        decodedToken = decodificarJWT(token);
    } catch (error) {
        if (error.message === 'Token expirado') {
            console.error('Token expirado');
            return res.status(401).json({ error: 'Token expirado' });
        }
        console.error('Token inválido');
        return res.status(401).json({ error: 'Token inválido' });
    }

    const { email } = decodedToken;
    console.log('Email del usuario:', email);

    let usuario;
    try {
        usuario = await buscarUsuarioPorEmail(email);
        if (!usuario) {
            console.error('Usuario no encontrado');
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        console.log('Datos del usuario encontrado:', usuario);
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        return res.status(500).json({ error: 'Error al buscar el usuario' });
    }

    if (!req.file) {
        console.log('No se subió ninguna imagen');
        return res.status(400).json({ error: "No se subió ninguna imagen" });
    }

    const { originalname, filename, path: filePath } = req.file;
    const fileUrl = `${BASE_URL}/imagenes/${filename}`;

    fs.readFile(filePath, async (err, fileContent) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).json({ error: 'Error al leer el archivo: ' + err.message });
        }

        try {
            // Llamar al servicio para crear la imagen en la base de datos
            let imagen = await crearImagen(originalname, fileUrl, usuario.id, filePath);

            return res.status(200).json({
                message: "Imagen subida exitosamente",
                fileUrl: fileUrl,
                usuario: usuario.id,
                imgaenid: imagen.id
            });
        } catch (dbError) {
            return res.status(500).json({ error: dbError.message });
        }
    });
};

// Función para subir videos
const uploadVideo = async (req, res) => {
    const { token } = req.params;
    console.log('Token:', token);

    if (!token) {
        console.error("Token no proporcionado en la URL");
        return res.status(400).json({ error: "Token no proporcionado en la URL" });
    }

    let decodedToken;
    try {
        decodedToken = decodificarJWT(token);
    } catch (error) {
        if (error.message === 'Token expirado') {
            console.error('Token expirado');
            return res.status(401).json({ error: 'Token expirado' });
        }
        console.error('Token inválido');
        return res.status(401).json({ error: 'Token inválido' });
    }

    const { email } = decodedToken;
    console.log('Email del usuario:', email);

    let usuario;
    try {
        usuario = await buscarUsuarioPorEmail(email);
        if (!usuario) {
            console.error('Usuario no encontrado');
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        console.log('Datos del usuario encontrado:', usuario);
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        return res.status(500).json({ error: 'Error al buscar el usuario' });
    }

    if (!req.file) {
        return res.status(400).send({ message: "No se subió ningún video" });
    }

    const { originalname, filename, path: filePath } = req.file;
    const fileUrl = `${BASE_URL}/videos/${filename}`;

    fs.readFile(filePath, async (err) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).send({ error: 'Error al leer el archivo: ' + err.message });
        }

        try {
            await crearVideo(originalname, fileUrl, usuario.id, filePath);
            console.log('Video guardado en la base de datos.');

            return res.send({
                message: "Video subido exitosamente",
                fileUrl: fileUrl,
            });
        } catch (dbError) {
            console.error('Error al guardar el video en la base de datos:', dbError);
            return res.status(500).send({ error: 'Error al guardar el video en la base de datos: ' + dbError.message });
        }
    });
};

// Función para subir otros archivos
const uploadFile = async (req, res) => {
    const { token } = req.params;
    console.log('Token:', token);

    if (!token) {
        console.error("Token no proporcionado en la URL");
        return res.status(400).json({ error: "Token no proporcionado en la URL" });
    }

    let decodedToken;
    try {
        decodedToken = decodificarJWT(token);
    } catch (error) {
        if (error.message === 'Token expirado') {
            console.error('Token expirado');
            return res.status(401).json({ error: 'Token expirado' });
        }
        console.error('Token inválido');
        return res.status(401).json({ error: 'Token inválido' });
    }

    const { email } = decodedToken;
    console.log('Email del usuario:', email);

    let usuario;
    try {
        usuario = await buscarUsuarioPorEmail(email);
        if (!usuario) {
            console.error('Usuario no encontrado');
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        console.log('Datos del usuario encontrado:', usuario);
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        return res.status(500).json({ error: 'Error al buscar el usuario' });
    }

    if (!req.file) {
        return res.status(400).send({ message: "No se subió ningún archivo" });
    }

    const { originalname, filename, path: filePath } = req.file;
    const fileUrl = `${BASE_URL}/archivos/${filename}`; 

    fs.readFile(filePath, async (err) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).send({ error: 'Error al leer el archivo: ' + err.message });
        }

        try {
            await crearArchivo(originalname, fileUrl, usuario.id, filePath);
            console.log('Archivo guardado en la base de datos.');

            return res.send({
                message: "Archivo subido exitosamente",
                fileUrl: fileUrl,
            });
        } catch (dbError) {
            console.error('Error al guardar el archivo en la base de datos:', dbError);
            return res.status(500).send({ error: 'Error al guardar el archivo en la base de datos: ' + dbError.message });
        }
    });
};

// Función para buscar imágenes
const buscarImagenes = async (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.status(400).json({ error: "Token no proporcionado en la URL" });
    }

    let decodedToken;
    try {
        decodedToken = decodificarJWT(token);
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    const { email } = decodedToken;

    let usuario;
    try {
        usuario = await buscarUsuarioPorEmail(email);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al buscar el usuario' });
    }

    const resultado = await buscarImagenesdb(usuario.id);

    if (resultado.error) {
        return res.status(500).json({ error: resultado.error });
    }

    return res.status(200).json(resultado);
};

// Función para buscar videos
const buscarVideos = async (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.status(400).json({ error: "Token no proporcionado en la URL" });
    }

    let decodedToken;
    try {
        decodedToken = decodificarJWT(token);
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    const { email } = decodedToken;

    let usuario;
    try {
        usuario = await buscarUsuarioPorEmail(email);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al buscar el usuario' });
    }

    const resultado = await buscarVideosdb(usuario.id);
    
    if (resultado.error) {
        return res.status(500).json({ error: resultado.error });
    }

    return res.status(200).json(resultado);
};


// Función para buscar archivos
const buscarArchivos = async (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.status(400).json({ error: "Token no proporcionado en la URL" });
    }

    let decodedToken;
    try {
        decodedToken = decodificarJWT(token);
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    const { email } = decodedToken;

    let usuario;
    try {
        usuario = await buscarUsuarioPorEmail(email);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al buscar el usuario' });
    }

    // Llamar a la función buscarArchivos pasando el ID del usuario
    const resultado = await buscarArchivosdb(usuario.id);
    
    // Verificar el resultado de la búsqueda
    if (resultado.error) {
        return res.status(500).json({ error: resultado.error });
    }

    return res.status(200).json(resultado);
};

const uploadImageGrpc = async (req, res) => { 
    console.log('Iniciando uploadImage');

    try {
        const { token } = req.params;

        if (!token) {
            throw new Error("Token no proporcionado en la URL");
        }

        let decodedToken;
        try {
            decodedToken = decodificarJWT(token);
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            throw new Error(error.message === 'Token expirado' ? 'Token expirado' : 'Token inválido');
        }

        const { email } = decodedToken;

        const usuario = await buscarUsuarioPorEmail(email);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        if (!req.file) {
            throw new Error("No se subió ninguna imagen");
        }

        const { originalname, filename } = req.file;
        const fileUrl = `${BASE_URL}/imagenes/${filename}`;

        const fileContent = await fs.promises.readFile(req.file.path);
        
        const imagen = await crearImagen(originalname, fileUrl, usuario.id, req.file.path);
        
        const binaryFile = Buffer.isBuffer(fileContent) ? fileContent : Buffer.from(fileContent);
        const base64File = binaryFile.toString('base64'); // Convertir a base64

        const uploadFile = () => {
            return new Promise((resolve, reject) => {
                const call = client.Upload((error, response) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(response);
                    }
                });

                
                call.write({
                    file_id: String(imagen.id),
                    owner_id: String(usuario.id),
                    binary_file: base64File, // Enviar archivo completo en base64
                    file_name: originalname
                });

                call.end(); // Finalizar la llamada
            });
        };

        const grpcResponse = await uploadFile();

        res.status(200).json({
            message: "Imagen subida exitosamente",
            fileUrl: fileUrl,
            usuario: usuario.id,
            imagenId: imagen.id,
            grpcFileId: grpcResponse.file_id
        });

    } catch (error) {
        console.error('Error en uploadImageGrpc:', error);
        const statusCode = error.message.includes('Token') ? 401 : 500;
        res.status(statusCode).json({ error: error.message });
    } finally {
        console.log('Finalizando uploadImageGrpc');
    }
};


const buscarImagenesGrpc = async (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.status(400).json({ error: "Token no proporcionado en la URL" });
    }

    let decodedToken;
    try {
        decodedToken = decodificarJWT(token);
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    const { email } = decodedToken;

    let usuario;
    try {
        usuario = await buscarUsuarioPorEmail(email);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al buscar el usuario' });
    }

    const resultado = await buscarImagenesdb(usuario.id);
    console.log('Resultado de la búsqueda de imágenes:', resultado);

    // Manejar el caso donde no se encuentran imágenes
    if (!resultado || (Array.isArray(resultado) && resultado.length === 0)) {
        return res.status(404).json({ message: 'No se encontraron imágenes' });
    }

    // Verificar si el resultado es un array antes de mapear
    if (!Array.isArray(resultado)) {
        return res.status(500).json({ error: 'Error en el formato de resultado' });
    }

    try {
        // Usar gRPC para descargar las imágenes
        const images = await Promise.all(resultado.map(async (imagen) => {
            console.log('imagen id:', imagen.id);
            console.log('usuario id:', usuario.id);
            const imageDownloadRequest = {
                file_id: String(imagen.id),      // ID de la imagen
                owner_id: String(usuario.id)      // ID del propietario
            };

            return new Promise((resolve, reject) => {
                const call = client.Download(imageDownloadRequest);
                let binaryFile = null;

                call.on('data', (response) => {
                    binaryFile = response.binary_file_response; // Almacenar los datos binarios
                });

                call.on('end', () => {
                    if (binaryFile) {
                        // Convertir el Buffer a Base64
                        const base64File = binaryFile.toString('base64');
                        resolve({ id: imagen.id, usuario_id: imagen.usuario_id, nombre_archivo: imagen.nombre_archivo, binary_file: base64File });
                    } else {
                        reject(new Error('No se pudo obtener el archivo'));
                    }
                });

                call.on('error', (error) => {
                    reject(error);
                });
            });
        }));

        return res.status(200).json(images);
    } catch (error) {
        console.error('Error al descargar imágenes a través de gRPC:', error);
        return res.status(500).json({ error: 'Error al descargar imágenes' });
    }
};

const uploadVideoGrpc = async (req, res) => {
    console.log('Iniciando uploadVideo');

    try {
        const { token } = req.params;

        if (!token) {
            throw new Error("Token no proporcionado en la URL");
        }

        let decodedToken;
        try {
            decodedToken = decodificarJWT(token);
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            throw new Error(error.message === 'Token expirado' ? 'Token expirado' : 'Token inválido');
        }

        const { email } = decodedToken;

        const usuario = await buscarUsuarioPorEmail(email);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        if (!req.file) {
            throw new Error("No se subió ningún video");
        }

        const { originalname, filename } = req.file;
        const fileUrl = `${BASE_URL}/videos/${filename}`;

        const fileContent = await fs.promises.readFile(req.file.path);
        
        const video = await crearVideo(originalname, fileUrl, usuario.id, req.file.path);

        // Convertir el contenido del archivo a base64
        const binaryFile = Buffer.isBuffer(fileContent) ? fileContent : Buffer.from(fileContent);
        const base64File = binaryFile.toString('base64');

        // Función para subir el video a través de gRPC
        const uploadFile = () => {
            return new Promise((resolve, reject) => {
                const call = client.Upload((error, response) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(response);
                    }
                });

                call.write({
                    file_id: String(video.id), 
                    owner_id: String(usuario.id),
                    binary_file: base64File,
                    file_name: originalname
                });

                call.end();
            });
        };

        const grpcResponse = await uploadFile();

        res.status(200).json({
            message: "Video subido exitosamente",
            fileUrl: fileUrl,
            usuario: usuario.id,
            videoId: video.id,
            grpcFileId: grpcResponse.file_id
        });

    } catch (error) {
        console.error('Error en uploadVideo:', error);
        const statusCode = error.message.includes('Token') ? 401 : 500;
        res.status(statusCode).json({ error: error.message });
    } finally {
        console.log('Finalizando uploadVideo');
    }
};

const buscarVideosGrpc = async (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.status(400).json({ error: "Token no proporcionado en la URL" });
    }

    let decodedToken;
    try {
        decodedToken = decodificarJWT(token);
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    const { email } = decodedToken;

    let usuario;
    try {
        usuario = await buscarUsuarioPorEmail(email);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al buscar el usuario' });
    }

    const resultado = await buscarVideosdb(usuario.id); 
    console.log('Resultado de la búsqueda de videos:', resultado);

    // Manejar el caso donde no se encuentran videos
    if (!resultado || (Array.isArray(resultado) && resultado.length === 0)) {
        return res.status(404).json({ message: 'No se encontraron videos' });
    }

    // Verificar si el resultado es un array antes de mapear
    if (!Array.isArray(resultado)) {
        return res.status(500).json({ error: 'Error en el formato de resultado' });
    }

    try {
        // Usar gRPC para descargar los videos
        const videos = await Promise.all(resultado.map(async (video) => {
            console.log('Video ID:', video.id);
            console.log('Usuario ID:', usuario.id);

            const videoDownloadRequest = {
                file_id: String(video.id),      // ID del video
                owner_id: String(usuario.id)     // ID del propietario
            };

            return new Promise((resolve, reject) => {
                const call = client.Download(videoDownloadRequest);
                let binaryFile = null;

                call.on('data', (response) => {
                    binaryFile = response.binary_file_response; 
                });

                call.on('end', () => {
                    if (binaryFile) {
                        // Convertir el Buffer a Base64
                        const base64File = binaryFile.toString('base64');
                        resolve({
                            id: video.id,
                            usuario_id: video.usuario_id,
                            nombre_archivo: video.nombre_archivo,
                            binary_file: base64File
                        });
                    } else {
                        reject(new Error('No se pudo obtener el archivo'));
                    }
                });

                call.on('error', (error) => {
                    reject(error);
                });
            });
        }));

        return res.status(200).json(videos);
    } catch (error) {
        console.error('Error al descargar videos a través de gRPC:', error);
        return res.status(500).json({ error: 'Error al descargar videos' });
    }
};


const uploadFileGrpc = async (req, res) => {
    console.log('Iniciando uploadFileGrpc');

    try {
        const { token } = req.params;
        console.log('Token:', token);

        if (!token) {
            throw new Error("Token no proporcionado en la URL");
        }

        let decodedToken;
        try {
            decodedToken = decodificarJWT(token);
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            throw new Error(error.message === 'Token expirado' ? 'Token expirado' : 'Token inválido');
        }

        const { email } = decodedToken;
        console.log('Email del usuario:', email);

        const usuario = await buscarUsuarioPorEmail(email);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        if (!req.file) {
            throw new Error("No se subió ningún archivo");
        }

        const { originalname, filename } = req.file;
        const fileUrl = `${BASE_URL}/archivos/${filename}`; 

        const fileContent = await fs.promises.readFile(req.file.path);
        

        const archivo = await crearArchivo(originalname, fileUrl, usuario.id, req.file.path);

        // Convertir a base64
        const binaryFile = Buffer.isBuffer(fileContent) ? fileContent : Buffer.from(fileContent);
        const base64File = binaryFile.toString('base64'); 

        const uploadFile = () => {
            return new Promise((resolve, reject) => {
                const call = client.Upload((error, response) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(response);
                    }
                });

                // Enviar el archivo a gRPC
                call.write({
                    file_id: String(archivo.id),
                    owner_id: String(usuario.id),
                    binary_file: base64File, // Enviar archivo completo en base64
                    file_name: originalname
                });

                call.end(); 
            });
        };

        const grpcResponse = await uploadFile();

        res.status(200).json({
            message: "Archivo subido exitosamente",
            fileUrl: fileUrl,
            usuario: usuario.id,
            archivoId: archivo.id,
            grpcFileId: grpcResponse.file_id
        });

    } catch (error) {
        console.error('Error en uploadFileGrpc:', error);
        const statusCode = error.message.includes('Token') ? 401 : 500;
        res.status(statusCode).json({ error: error.message });
    } finally {
        console.log('Finalizando uploadFileGrpc');
    }
};

const buscarArchivosGrpc = async (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.status(400).json({ error: "Token no proporcionado en la URL" });
    }

    let decodedToken;
    try {
        decodedToken = decodificarJWT(token);
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    const { email } = decodedToken;

    let usuario;
    try {
        usuario = await buscarUsuarioPorEmail(email);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al buscar el usuario' });
    }

    const resultado = await buscarArchivosdb(usuario.id);
    console.log('Resultado de la búsqueda de archivos:', resultado);

    // Manejar el caso donde no se encuentran archivos
    if (!resultado || (Array.isArray(resultado) && resultado.length === 0)) {
        return res.status(404).json({ message: 'No se encontraron archivos' });
    }

    // Verificar si el resultado es un array antes de mapear
    if (!Array.isArray(resultado)) {
        return res.status(500).json({ error: 'Error en el formato de resultado' });
    }

    try {
        // Usar gRPC para descargar los archivos
        const archivos = await Promise.all(resultado.map(async (archivo) => {
            console.log('Archivo ID:', archivo.id);
            console.log('Usuario ID:', usuario.id);

            const archivoDownloadRequest = {
                file_id: String(archivo.id),      // ID del archivo
                owner_id: String(usuario.id)       // ID del propietario
            };

            return new Promise((resolve, reject) => {
                const call = client.Download(archivoDownloadRequest);
                let binaryFile = null;

                call.on('data', (response) => {
                    binaryFile = response.binary_file_response; 
                });

                call.on('end', () => {
                    if (binaryFile) {
                        // Convertir el Buffer a Base64
                        const base64File = binaryFile.toString('base64');
                        resolve({
                            id: archivo.id,
                            usuario_id: archivo.usuario_id,
                            nombre_archivo: archivo.nombre_archivo,
                            binary_file: base64File
                        });
                    } else {
                        reject(new Error('No se pudo obtener el archivo'));
                    }
                });

                call.on('error', (error) => {
                    reject(error);
                });
            });
        }));

        return res.status(200).json(archivos);
    } catch (error) {
        console.error('Error al descargar archivos a través de gRPC:', error);
        return res.status(500).json({ error: 'Error al descargar archivos' });
    }
};




export default {
    uploadImage,
    uploadVideo,
    uploadFile,
    buscarImagenes,
    buscarVideos,
    buscarArchivos,
    uploadImageGrpc,
    buscarImagenesGrpc,
    uploadVideoGrpc,
    buscarVideosGrpc,
    uploadFileGrpc,
    buscarArchivosGrpc
};

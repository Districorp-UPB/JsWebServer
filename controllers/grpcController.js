import fs from 'fs';
import path from 'path';
import client from '../services/grpcService.js';  // Asegúrate de importar correctamente el cliente gRPC
import grpc from '@grpc/grpc-js';

// Función para subir imágenes
// Función para subir imágenes
// Función para subir imágenes
const uploadImage = (req, res) => {
    console.log('Iniciando uploadImage');

    if (!req.file) {
        console.log('No se subió ninguna imagen');
        return res.status(400).send({ message: "No se subió ninguna imagen" });
    }

    const { originalname, path: filePath } = req.file;
    const ownerId = "1"; // Puedes reemplazar con el verdadero ID del usuario
    const fileId = "2"; // Genera un ID único para el archivo (puedes usar un generador de IDs si lo prefieres)

    // Leer el contenido completo del archivo
    fs.readFile(filePath, (err, fileContent) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).send({ error: 'Error al leer el archivo: ' + err.message });
        }

        // Crear la solicitud de carga utilizando FileUploadRequest
        const uploadRequest = {
            file_id: fileId,           // ID del archivo
            owner_id: ownerId,         // ID del propietario del archivo
            binary_file: fileContent,  // Contenido del archivo leído como Buffer
            file_name: originalname     // Nombre original del archivo
        };

        // Llamada gRPC para subir el archivo
        client.Upload(uploadRequest, (error, response) => {
            if (error) {
                console.error('Error en la subida de imagen a gRPC:', error);
                return res.status(500).send({ error: 'Error en la subida de imagen a gRPC: ' + error.message });
            }

            // Si el servidor responde correctamente, muestra el file_id
            console.log('Imagen subida con éxito, file_id:', response.file_id);
            return res.send({
                message: "Imagen subida exitosamente",
                fileId: response.file_id,
            });
        });
    });
};


// Función para subir videos
const uploadVideo = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: "No se subió ningún video" });
    }

    const { originalname, path: filePath } = req.file;
    const ownerId = "owner_id_example";
    const fileId = "video_" + Date.now();

    const fileStream = fs.createReadStream(filePath);

    const call = client.Upload((error, response) => {
        if (error) {
            return res.status(500).send({ error: 'Error en gRPC: ' + error.message });
        }
        res.send({
            message: "Video subido exitosamente a gRPC",
            fileId: response.file_id,
        });
    });

    fileStream.on('data', (chunk) => {
        call.write({
            file_id: fileId,
            owner_id: ownerId,
            binary_file: chunk,
            file_name: originalname,
        });
    });

    fileStream.on('end', () => {
        call.end();
    });

    fileStream.on('error', (error) => {
        console.error('Error en el stream de lectura del archivo:', error);
        call.cancel();
        res.status(500).send({ error: 'Error en la lectura del archivo: ' + error.message });
    });
};

// Función para subir otros archivos
const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: "No se subió ningún archivo" });
    }

    const { originalname, path: filePath } = req.file;
    const ownerId = "owner_id_example";
    const fileId = "file_" + Date.now();

    const fileStream = fs.createReadStream(filePath);

    const call = client.Upload((error, response) => {
        if (error) {
            return res.status(500).send({ error: 'Error en gRPC: ' + error.message });
        }
        res.send({
            message: "Archivo subido exitosamente a gRPC",
            fileId: response.file_id,
        });
    });

    fileStream.on('data', (chunk) => {
        call.write({
            file_id: fileId,
            owner_id: ownerId,
            binary_file: chunk,
            file_name: originalname,
        });
    });

    fileStream.on('end', () => {
        call.end();
    });

    fileStream.on('error', (error) => {
        console.error('Error en el stream de lectura del archivo:', error);
        call.cancel();
        res.status(500).send({ error: 'Error en la lectura del archivo: ' + error.message });
    });
};

export default {
    uploadImage,
    uploadVideo,
    uploadFile
};

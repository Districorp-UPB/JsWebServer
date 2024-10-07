import fs from 'fs';
import path from 'path';
import client from '../services/grpcService.js';  // Asegúrate de importar correctamente el cliente gRPC
import grpc from '@grpc/grpc-js';

// Función para subir imágenes
const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: "No se subió ninguna imagen" });
    }

    const { originalname, path: filePath } = req.file;
    const ownerId = "owner_id_example"; // Puedes reemplazar con el verdadero ID del usuario
    const fileId = "image_" + Date.now(); // Genera un ID único para el archivo

    const fileStream = fs.createReadStream(filePath);
    const call = client.Upload((error, response) => {
        if (error) {
            return res.status(500).send({ error: 'Error en gRPC: ' + error.message });
        }
        res.send({
            message: "Imagen subida exitosamente a gRPC",
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

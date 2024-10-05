import express from "express";
import upload from "../middleware/multer.js";
import grpcController from "../controllers/grpcController.js"; // Importa el controlador

const router = express.Router();

// Ruta para subir imágenes
router.post("/upload/imagen", upload.single('image'), grpcController.uploadImage);

// Ruta para subir videos
router.post("/upload/video", upload.single('video'), grpcController.uploadVideo);

// Ruta para subir otros archivos
router.post("/upload/archivos", upload.single('file'), grpcController.uploadFile);

export default router;

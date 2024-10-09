import express from "express";
import upload from "../middleware/multer.js";
import grpcController from "../controllers/grpcController.js"; // Importa el controlador

const router = express.Router();

// Ruta para subir imágenes
router.post("/upload/imagen/:token", upload.single('image'), grpcController.uploadImage);

// Ruta para subir videos
router.post("/upload/video/:token", upload.single('video'), grpcController.uploadVideo);

// Ruta para subir otros archivos
router.post("/upload/archivo/:token", upload.single('file'), grpcController.uploadFile);

// Ruta para buscar imágenes
router.get("/imagenes/:token", grpcController.buscarImagenes);

// Ruta para buscar videos
router.get("/videos/:token", grpcController.buscarVideos);

// Ruta para buscar archivos
router.get("/archivos/:token", grpcController.buscarArchivos);

export default router;

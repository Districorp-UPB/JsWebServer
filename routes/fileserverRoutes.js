import express from "express";
import upload from "../middleware/multer.js";
import grpcController from "../controllers/grpcController.js"; 

const router = express.Router();

router.post("/upload/imagen/:token", upload.single('image'), grpcController.uploadImage);

router.post("/grpc/upload/imagen/:token", upload.single('image'), grpcController.uploadImageGrpc);

router.post("/upload/video/:token", upload.single('video'), grpcController.uploadVideo);

router.post("/grpc/upload/video/:token", upload.single('video'), grpcController.uploadVideoGrpc);

router.post("/upload/archivo/:token", upload.single('file'), grpcController.uploadFile);

router.post("/grpc/upload/archivo/:token", upload.single('file'), grpcController.uploadFileGrpc);

router.get("/imagenes/:token", grpcController.buscarImagenes);

router.get("/grpc/imagenes/:token", grpcController.buscarImagenesGrpc);

router.get("/videos/:token", grpcController.buscarVideos);

router.get("/grpc/videos/:token", grpcController.buscarVideosGrpc);

router.get("/archivos/:token", grpcController.buscarArchivos);

router.get("/grpc/archivos/:token", grpcController.buscarArchivosGrpc);

export default router;

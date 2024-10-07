import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';

// Cargar el archivo .proto
const PROTO_PATH = path.resolve('proto/upload.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

// Cargar el servicio del proto
const fileProto = grpc.loadPackageDefinition(packageDefinition).proto;

// Crear el cliente gRPC
const client = new fileProto.FileService(
    'sistema3.bucaramanga.upb.edu.co:50051',
    grpc.credentials.createInsecure()
);

export default client;

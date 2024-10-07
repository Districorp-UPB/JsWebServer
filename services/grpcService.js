import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.resolve('proto/upload.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const fileProto = grpc.loadPackageDefinition(packageDefinition).proto;

const client = new fileProto.FileService(
    '207.248.81.128:50051',
    grpc.credentials.createInsecure(),
    {
        'grpc.max_receive_message_length': 1024 * 1024 * 1024, // 1GB
        'grpc.max_send_message_length': 1024 * 1024 * 1024, // 1GB
        'grpc.keepalive_time_ms': 120000,
        'grpc.http2.min_time_between_pings_ms': 120000,
        'grpc.keepalive_timeout_ms': 20000,
        'grpc.http2.max_pings_without_data': 0,
        'grpc.keepalive_permit_without_calls': 1
    }
);

// Log para indicar que se ha conectado al servidor gRPC
client.waitForReady(Date.now() + 5000, (error) => {
    if (error) {
        console.error('No se pudo conectar al servidor gRPC:', error);
    } else {
        console.log('Conectado al servidor gRPC: 207.248.81.128:50051');
    }
});

export default client;

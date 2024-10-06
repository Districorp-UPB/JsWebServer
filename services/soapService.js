import soap from 'soap';  // Importar el módulo soap
import soapConfig from '../config/soapConfig.js';  // Importar la configuración del SOAP server

const SOAP_URL = soapConfig.url;
let storedToken = null;

// Función para autenticar al usuario
const authenticateUser = async (username, password) => {
    return new Promise((resolve, reject) => {
        soap.createClient(SOAP_URL, (err, client) => {
            if (err) {
                console.error('Error creando el cliente SOAP:', err);
                return reject(err);
            }

            // Acceder directamente al método 'authenticate' disponible en el cliente
            client.authenticate({ Username: username, Password: password }, (err, result) => { 
                if (err) {
                    console.error('Error en la llamada al método authenticate:', err);
                    return reject(err);
                }

                // Registrar la respuesta completa del servidor SOAP
                console.log("SOAP Response:", result);

                try {
                    // Intentar acceder directamente a 'Token'
                    storedToken = result.Token;
                    if (!storedToken) {
                        throw new Error("Token no encontrado en la respuesta SOAP");
                    }
                    resolve(storedToken);
                } catch (parseError) {
                    console.error('Error procesando la respuesta SOAP:', parseError);
                    reject(parseError);
                }
            });
        });
    });
};

// Exportar la función authenticateUser
export default { authenticateUser };

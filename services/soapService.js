import soap from 'soap';  
import soapConfig from '../config/soapConfig.js';  

const SOAP_URL = soapConfig.url;
let storedToken = null;

const authenticateUser = async (username, password) => {
    return new Promise((resolve, reject) => {
        soap.createClient(SOAP_URL, (err, client) => {
            if (err) {
                console.error('Error creando el cliente SOAP:', err);
                return reject(err);
            }

            client.authenticate({ Username: username, Password: password }, (err, result) => { 
                if (err) {
                    console.error('Error en la llamada al método authenticate:', err);
                    return reject(err);
                }

                console.log("SOAP Response:", result);

                try {
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

export default { authenticateUser };

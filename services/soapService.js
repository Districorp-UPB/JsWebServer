import soap from 'soap';
import soapConfig from '../config/soapConfig.js'; 
import https from 'https';

const SOAP_WSDL_URL = soapConfig.url; 
let storedToken = null;  

const authenticateUser = async (email, password, ou) => {
    return new Promise((resolve, reject) => {
        const agent = new https.Agent({
            rejectUnauthorized: false 
        });

        const options = {
            wsdl_options: {
                agent: agent 
            }
        };

        soap.createClient(SOAP_WSDL_URL, options, (err, client) => {
            if (err) {
                console.error('Error creando el cliente SOAP:', err);
                return reject(err);
            }
            const args = {
                loginRequest: {
                    email,
                    password,
                    ou
                }
            };
            client.login(args, (err, result) => {
                if (err) {
                    console.error('Error en la llamada al método login:', err);
                    return reject(err);
                }

                console.log("SOAP Response:", result);

                try {
                    const token = result.parameters?.token;
                    if (!token) {
                        throw new Error("Token no encontrado en la respuesta SOAP");
                    }
                    storedToken = token;
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



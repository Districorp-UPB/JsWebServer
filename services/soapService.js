import soap from 'soap';
import soapConfig from '../config/soapConfig.js'; 
import https from 'https';


const SOAP_LOGIN_WSDL_URL = soapConfig.login; 
const SOAP_REGISTER_WSDL_URL = soapConfig.register;
console.log('SOAP WSDL URL de Login:', SOAP_LOGIN_WSDL_URL); 
console.log('SOAP WSDL URL de Registro:', SOAP_REGISTER_WSDL_URL);

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

        soap.createClient(SOAP_LOGIN_WSDL_URL, options, (err, client) => {
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

const registerUser = async (name, surname, email, phone, document, password, role) => {
    return new Promise((resolve, reject) => {
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        const options = {
            wsdl_options: {
                agent: agent
            }
        };

        soap.createClient(SOAP_REGISTER_WSDL_URL, options, (err, client) => {
            if (err) {
                console.error('Error creando el cliente SOAP para registro:', err);
                return reject(err);
            }

            const args = {
                registerRequest: { 
                    name,
                    surname,
                    email,
                    phone,
                    document,
                    password,
                    role,
                }
            };

            client.register(args, (err, result) => {
                if (err) {
                    console.error('Error en la llamada al método register:', err);
                    return reject({ status: 'error', message: err.message || 'Error desconocido' });
                }

                console.log("SOAP Response de registro:", result);

                try {
                    const status = result.parameters?.status;  
                    const message = result.parameters?.message;
                    if (!status) {
                        throw new Error("Estado no encontrado en la respuesta SOAP de registro");
                    }
                    resolve({ status, message });
                } catch (parseError) {
                    console.error('Error procesando la respuesta SOAP de registro:', parseError);
                    reject(parseError);
                }
            });
        });
    });
};


export default { authenticateUser, registerUser };



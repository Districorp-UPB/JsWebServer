import soap from 'soap';
import soapConfig from '../config/soapConfig.js'; 
import https from 'https';


const SOAP_LOGIN_WSDL_URL = soapConfig.login; 
const SOAP_REGISTER_WSDL_URL = soapConfig.register;
const SOAP_UPDATE_WSDL_URL = soapConfig.edit; 
const SOAP_DELETE_WSDL_URL = soapConfig.delete; 
console.log('SOAP WSDL URL de Login:', SOAP_LOGIN_WSDL_URL); 
console.log('SOAP WSDL URL de Registro:', SOAP_REGISTER_WSDL_URL);
console.log('SOAP WSDL URL de Actualización:', SOAP_UPDATE_WSDL_URL);
console.log('SOAP WSDL URL de Eliminar:', SOAP_DELETE_WSDL_URL);


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

const registerUser = async (name, surname, email, phone, document, password, ou) => {
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
                    ou,
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

const editUser = async (email, ou, name, surname, phone, document) => {
    return new Promise((resolve, reject) => {
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        const options = {
            wsdl_options: {
                agent: agent
            }
        };

        soap.createClient(SOAP_UPDATE_WSDL_URL, options, (err, client) => {
            if (err) {
                console.error('Error creando el cliente SOAP para edición:', err);
                return reject(err);
            }

            const args = {
                editRequest: {
                    email,
                    ou,
                    name,
                    surname,
                    phone,
                    document
                }
            };

            client.edit(args, (err, result) => {
                if (err) {
                    console.error('Error en la llamada al método edit:', err);
                    return reject({ status: 'error', message: err.message || 'Error desconocido' });
                }

                console.log("SOAP Response de edición (completa):", result);

                try {
                    const status = result?.parameters?.status || result?.editResponse?.status;
                    const message = result?.parameters?.message || result?.editResponse?.message;

                    if (!status) {
                        throw new Error("Estado no encontrado en la respuesta SOAP de edición");
                    }
                    resolve({ status, message });
                } catch (parseError) {
                    console.error('Error procesando la respuesta SOAP de edición:', parseError);
                    reject(parseError);
                }
            });
        });
    });
};


const deleteUser = async (email, ou) => {
    return new Promise((resolve, reject) => {
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        const options = {
            wsdl_options: {
                agent: agent
            }
        };

        soap.createClient(SOAP_DELETE_WSDL_URL, options, (err, client) => {
            if (err) {
                console.error('Error creando el cliente SOAP para eliminar:', err);
                return reject(err);
            }

            const args = {
                parameters: { 
                    deleteRequest: {
                        email,
                        ou
                    }
                }
            };

            client.delete(args, (err, result) => {
                if (err) {
                    console.error('Error en la llamada al método delete:', err);
                    return reject({ status: 'error', message: err.message || 'Error desconocido' });
                }

                console.log("SOAP Response de eliminación:", result);

                try {
                    const status = result.parameters?.status;
                    const message = result.parameters?.message;

                    if (!status) {
                        throw new Error("Estado no encontrado en la respuesta SOAP de eliminación");
                    }
                    resolve({ status, message });
                } catch (parseError) {
                    console.error('Error procesando la respuesta SOAP de eliminación:', parseError);
                    reject(parseError);
                }
            });
        });
    });
};


export default { authenticateUser, registerUser , editUser, deleteUser};



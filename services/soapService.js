const soap = require('soap');
const xml2js = require('xml2js');
const soapConfig = require('../config/soapConfig');

const SOAP_URL = soapConfig.url;
let storedToken = null;

const authenticateUser = async (username, password) => {
    return new Promise((resolve, reject) => {
        const builder = new xml2js.Builder();
        const xmlRequest = builder.buildObject({
            AuthenticateRequest: { 
                Username: username,
                Password: password
            }
        });

        soap.createClient(SOAP_URL, (err, client) => {
            if (err) {
                return reject(err);
            }

            client.AuthenticationPort.authenticate({ Username: username, Password: password }, (err, result) => { 
                if (err) {
                    return reject(err);
                }

                const parser = new xml2js.Parser();
                parser.parseString(result, (err, jsonResult) => {
                    if (err) {
                        return reject(err);
                    }

                    storedToken = jsonResult.AuthenticateResponse.Response.Token;
                    resolve(storedToken);
                });
            });
        });
    });
};

module.exports = { authenticateUser };



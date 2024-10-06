import httpService from "../services/httpService.js";

const enviarDatos = (req, res) => {
    const datosRecibidos = req.body;
    console.log('Datos recibidos del cliente: ', datosRecibidos);
    httpService.guardarDatos(datosRecibidos);
    res.json({ message: 'Datos recibidos correctamente', datos: datosRecibidos });
};

const obtenerDatos = (req, res) => {
    const datos = httpService.obtenerDatos();
    if (!datos) {
        return res.status(404).json({ message: 'No hay datos disponibles' });
    }
    res.json({ message: 'Datos enviados correctamente', datos });
};

export default { enviarDatos, obtenerDatos };
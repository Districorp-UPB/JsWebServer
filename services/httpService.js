let datosAlmacenados = {};

exports.guardarDatos = (datos) => {
    datosAlmacenados = datos;
};

exports.obtenerDatos = () => {
    return Object.keys(datosAlmacenados).length ? datosAlmacenados : null;
};


let datosAlmacenados = {};  // Variable para almacenar datos

const guardarDatos = (datos) => {
    datosAlmacenados = datos;  // Almacenar los datos recibidos
};

const obtenerDatos = () => {
    return Object.keys(datosAlmacenados).length ? datosAlmacenados : null;  // Retornar datos si existen, de lo contrario null
};

export default { guardarDatos, obtenerDatos };

let datosAlmacenados = {};  

const guardarDatos = (datos) => {
    datosAlmacenados = datos;  
};

const obtenerDatos = () => {
    return Object.keys(datosAlmacenados).length ? datosAlmacenados : null;
};

export default { guardarDatos, obtenerDatos };

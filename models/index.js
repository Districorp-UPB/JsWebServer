import Usuario from './Usuario.js';
import Archivo from './Archivo.js';
import Imagen from './Imagen.js';
import Video from './Video.js';
//import db from '../config/db.js';

//relaciones entre los modelos
Usuario.hasMany(Archivo, { foreignKey: 'usuario_id', onDelete: 'CASCADE' });
Archivo.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Usuario.hasMany(Imagen, { foreignKey: 'usuario_id', onDelete: 'CASCADE' });
Imagen.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Usuario.hasMany(Video, { foreignKey: 'usuario_id', onDelete: 'CASCADE' });
Video.belongsTo(Usuario, { foreignKey: 'usuario_id' });

export {
    Usuario,
    Archivo,
    Imagen,
    Video
};

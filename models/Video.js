import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Video = sequelize.define('Video', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_archivo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    url: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: Usuario,
        //     key: 'id'
        // },
        onDelete: 'CASCADE'
    },
    ubicacion_archivo: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'videos',
    timestamps: false
});

export default Video;

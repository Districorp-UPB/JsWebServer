import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING(15)
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    cedula: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    usertype: {
        type: DataTypes.ENUM('Employee', 'User', 'Admin'),
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});

export default Usuario;

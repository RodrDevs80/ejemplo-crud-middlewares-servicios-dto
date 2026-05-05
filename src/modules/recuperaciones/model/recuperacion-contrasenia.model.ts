import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../../../config/database/conexion.js';

// Modelo para solicitud de recuperación de contraseña.
export class RecuperacionContrasenia extends Model<InferAttributes<RecuperacionContrasenia>, InferCreationAttributes<RecuperacionContrasenia>> {
  declare id: CreationOptional<number>;
  declare idUsuario: number | null;
  declare fechaExpiracion: Date;
  declare usado: CreationOptional<boolean>;
  declare fechaUso: Date | null;
  declare idAdministrativo: number | null;
  declare idDocente: number | null;
}

RecuperacionContrasenia.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    idUsuario: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    fechaExpiracion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    usado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    fechaUso: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    idAdministrativo: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    idDocente: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'recuperaciones_contrasenia',
    timestamps: false,
  }
);

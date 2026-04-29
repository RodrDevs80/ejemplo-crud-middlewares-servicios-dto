import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../../../config/database/conexion.js';

// Modelo para sesiones de usuario.
export class SesionUsuario extends Model<InferAttributes<SesionUsuario>, InferCreationAttributes<SesionUsuario>> {
  declare id: CreationOptional<number>;
  declare idUsuario: number | null;
  declare fechaInicioSesion: CreationOptional<Date>;
  declare fechaCierreSesion: Date | null;
  declare intentoFallido: CreationOptional<number>;
  declare bloqueado: CreationOptional<boolean>;
  declare idAdministrativo: number | null;
  declare idDocente: number | null;
}

SesionUsuario.init(
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
    fechaInicioSesion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    fechaCierreSesion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    intentoFallido: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    bloqueado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    tableName: 'sesiones_usuarios',
    timestamps: false,
  }
);

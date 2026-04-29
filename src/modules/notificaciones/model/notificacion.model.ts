import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../../../config/database/conexion.js';

// Modelo Sequelize para la tabla `notificaciones`.
export class Notificacion extends Model<InferAttributes<Notificacion>, InferCreationAttributes<Notificacion>> {
  declare id: CreationOptional<number>;
  declare idEstudiante: number | null;
  declare idDocente: number | null;
  declare idAdministrativo: number | null;
  declare titulo: string;
  declare mensaje: string;
  declare tipo: string;
  declare entidadRelacionada: string | null;
  declare entidadId: number | null;
  declare leida: CreationOptional<boolean>;
  declare fechaCreacion: CreationOptional<Date>;
}

Notificacion.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    idEstudiante: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    idDocente: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    idAdministrativo: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    titulo: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    entidadRelacionada: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    entidadId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    leida: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'notificaciones',
    timestamps: false,
  }
);

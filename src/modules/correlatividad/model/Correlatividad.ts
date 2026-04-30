import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from 'sequelize';
import sequelize from '../../../core/database'; // Ajusta la ruta según tu configuración

class Correlatividad extends Model<
  InferAttributes<Correlatividad>,
  InferCreationAttributes<Correlatividad>
> {
  declare id: CreationOptional<number>;
  declare plan_id: ForeignKey<number>;
  declare asignatura_id: ForeignKey<number>;
  declare asignatura_correlativa_id: ForeignKey<number>;
  declare condicion: 'REGULARIZADA' | 'APROBADA';

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

Correlatividad.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    plan_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    asignatura_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    asignatura_correlativa_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    condicion: {
      type: DataTypes.ENUM('REGULARIZADA', 'APROBADA'),
      allowNull: false,
      defaultValue: 'REGULARIZADA',
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'correlatividades',
    timestamps: true,
    // hooks: puedes agregar lógica de negocio aquí si se requiere
  }
);

export default Correlatividad;

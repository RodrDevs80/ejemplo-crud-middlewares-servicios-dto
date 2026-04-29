import sequelize from "../config/database/conexion.js";
import Administrativo from "./administrativos/model/Administrativo.js";
import Rol from "./roles/model/Rol.js";
import InstanciaEvaluativa from "./instanciasEvaluativas/model/InstanciaEvaluativa.js";
import LegajoXInstanciaEvaluativa from "./legajosXInstanciasEvaluativas/model/LegajoXInstanciaEvaluativa.js";

// ---------- Rol ----------
Rol.hasMany(Administrativo, { foreignKey: "idRol" });
Administrativo.belongsTo(Rol, { foreignKey: "idRol" });

// ---------- InstanciaEvaluativa ----------
Administrativo.hasMany(InstanciaEvaluativa, { foreignKey: "idAdministrativo" });
InstanciaEvaluativa.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });

// ---------- LegajoXInstanciaEvaluativa ----------
InstanciaEvaluativa.hasMany(LegajoXInstanciaEvaluativa, { foreignKey: "idInstanciaEvaluativa" });
LegajoXInstanciaEvaluativa.belongsTo(InstanciaEvaluativa, { foreignKey: "idInstanciaEvaluativa" });

Administrativo.hasMany(LegajoXInstanciaEvaluativa, { foreignKey: "idAdministrativo" });
LegajoXInstanciaEvaluativa.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });

export { sequelize, Administrativo, Rol, InstanciaEvaluativa, LegajoXInstanciaEvaluativa };
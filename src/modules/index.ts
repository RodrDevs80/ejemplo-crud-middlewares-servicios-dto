import sequelize from "../config/database/conexion.js";
import Administrativo from "./administrativos/model/Administrativo.js";
import Rol from "./roles/model/Rol.js";

// Estarían las relaciones entre modelos, por ejemplo:
// ---------- Rol ----------
Rol.hasMany(Administrativo, { foreignKey: "idRol" });
Administrativo.belongsTo(Rol, { foreignKey: "idRol" });

export { sequelize, Administrativo, Rol };
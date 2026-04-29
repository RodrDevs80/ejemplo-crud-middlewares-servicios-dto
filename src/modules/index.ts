import sequelize from "../config/database/conexion.js";
import Administrativo from "./administrativos/model/Administrativo.js";
import Rol from "./roles/model/Rol.js";
import Carrera from "./carreras/model/Carrera.js";
import PlanEstudio from "./planes_estudios/model/PlanEstudio.js";
import UnidadCurricular from "./unidades_curriculares/model/UnidadCurricular.js";

// Estarían las relaciones entre modelos, por ejemplo:
// ---------- Rol ----------
Rol.hasMany(Administrativo, { foreignKey: "idRol" });
Administrativo.belongsTo(Rol, { foreignKey: "idRol" });

//  Carrera -> PlanEstudio
Carrera.hasMany(PlanEstudio, { foreignKey: "idCarrera" });
PlanEstudio.belongsTo(Carrera, { foreignKey: "idCarrera" });


//  Administrativo -> PlanEstudio
Administrativo.hasMany(PlanEstudio, { foreignKey: "idAdministrativo" });
PlanEstudio.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });

// Administrativo ↔ Carrera
Administrativo.hasMany(Carrera, { foreignKey: "idAdministrativo" });
Carrera.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });

// PlanEstudio ↔ UnidadCurricular
PlanEstudio.hasMany(UnidadCurricular, { foreignKey: "idPlanEstudio" });
UnidadCurricular.belongsTo(PlanEstudio, { foreignKey: "idPlanEstudio" });

// Administrativo ↔ UnidadCurricular
Administrativo.hasMany(UnidadCurricular, { foreignKey: "idAdministrativo" });
UnidadCurricular.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });

export { sequelize, Administrativo, Rol, Carrera, PlanEstudio };
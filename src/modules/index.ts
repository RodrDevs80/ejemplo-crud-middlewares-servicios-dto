import sequelize from "../config/database/conexion.js";
import Administrativo from "./administrativos/model/Administrativo.js";
import CambioPlanEstudio from "./cambioPlanEstudio/model/CambioPlanEstudio.js";
import DossierInstitucional from "./dossierInstitucional/model/DossierInstitucional.js";
import Estudiante from "./estudiantes/model/Estudiante.js";
import InformacionExtra from "./informacionExtra/model/InformacionExtra.js";
import InscripcionCarrera from "./inscripcionCarrera/model/InscripcionCarrera.js";
import Legajo from "./legajos/model/Legajo.js";
import Preinscripto from "./preinscriptos/model/Preinscripto.js";
import Rol from "./roles/model/Rol.js";
import Carrera from "./carreras/model/Carrera.js";
import PlanEstudio from "./planes_estudios/model/PlanEstudio.js";
import UnidadCurricular from "./unidades_curriculares/model/UnidadCurricular.js";


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


// Relaciones con Administrativo (ya que todas las tablas tienen idAdministrativo)
Administrativo.hasMany(CambioPlanEstudio, { foreignKey: "idAdministrativo" });
CambioPlanEstudio.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });

Administrativo.hasMany(DossierInstitucional, { foreignKey: "idAdministrativo" });
DossierInstitucional.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });

Administrativo.hasMany(Estudiante, { foreignKey: "idAdministrativo" });
Estudiante.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });

Administrativo.hasMany(InformacionExtra, { foreignKey: "idAdministrativo" });
InformacionExtra.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });

Administrativo.hasMany(InscripcionCarrera, { foreignKey: "idAdministrativo" });
InscripcionCarrera.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });

Administrativo.hasMany(Legajo, { foreignKey: "idAdministrativo" });
Legajo.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });

Administrativo.hasMany(Preinscripto, { foreignKey: "idAdministrativo" });
Preinscripto.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });


export {
  sequelize,
  Administrativo,
  Rol,
  CambioPlanEstudio,
  DossierInstitucional,
  Estudiante,
  InformacionExtra,
  InscripcionCarrera,
  Legajo,
  Preinscripto,
  Carrera, 
  PlanEstudio
};

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

// Relaciones adicionales (opcionales, si existen otros modelos)
// Por ejemplo: Estudiante.hasMany(Legajo) etc.

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
  Preinscripto
};
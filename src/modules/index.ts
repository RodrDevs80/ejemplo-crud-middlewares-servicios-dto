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
  InstanciaEvaluativa,
  LegajoXInstanciaEvaluativa
};

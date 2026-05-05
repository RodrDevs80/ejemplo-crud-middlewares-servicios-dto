import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { sequelize } from "./modules/index.js";
import { errorHandler } from "./core/middlewares/error-handler.middleware.js";
import { administrativoRouter } from "./modules/administrativos/administrativo.routes.js";
import { rolRouter } from './modules/roles/roles.routes.js';
import { instanciaEvaluativaRouter } from './modules/instanciasEvaluativas/instancia-evaluativa.routes.js';
import { legajoXInstanciaEvaluativaRouter } from './modules/legajosXInstanciasEvaluativas/legajo-x-instancia-evaluativa.routes.js';
import { cambioPlanEstudioRouter } from "./modules/cambioPlanEstudio/cambioPlanEstudio.routes.js";
import { dossierInstitucionalRouter } from "./modules/dossierInstitucional/dossierInstitucional.routes.js";
import { estudianteRouter } from "./modules/estudiantes/estudiante.routes.js";
import { informacionExtraRouter } from "./modules/informacionExtra/informacionExtra.routes.js";
import { inscripcionCarreraRouter } from "./modules/inscripcionCarrera/inscripcionCarrera.routes.js";
import { legajoRouter } from "./modules/legajos/legajo.routes.js";
import { preinscriptoRouter } from "./modules/preinscriptos/preinscriptos.routes.js";


dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 4000;
const RAIZ: string = "/api/v1";

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.use(`${RAIZ}/administrativos`, administrativoRouter);
app.use(`${RAIZ}/roles`, rolRouter);
app.use(`${RAIZ}/instancias-evaluativas`, instanciaEvaluativaRouter);
app.use(`${RAIZ}/legajos-x-instancias-evaluativas`, legajoXInstanciaEvaluativaRouter);
app.use(`${RAIZ}/cambios-plan-estudio`, cambioPlanEstudioRouter);
app.use(`${RAIZ}/dossiers-institucionales`, dossierInstitucionalRouter);
app.use(`${RAIZ}/estudiantes`, estudianteRouter);
app.use(`${RAIZ}/informacion-extra`, informacionExtraRouter);
app.use(`${RAIZ}/inscripciones-carreras`, inscripcionCarreraRouter);
app.use(`${RAIZ}/legajos`, legajoRouter);
app.use(`${RAIZ}/preinscriptos`, preinscriptoRouter);

app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: 200,
    msg: "App funcionando 🧑‍💻",
    url: `http://localhost:${PORT}`,
  });
});

app.use(errorHandler);


const main = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos exitosa!");
    // Sincronización de modelos (¡precaución en producción!)
    // cuando haya cambios en los modelos en desarrollo, usar force: true para reiniciar tablas (¡peligroso en producción!)
    await sequelize.sync({ force: false }); // Cambia a 'true' para reiniciar tablas (¡peligroso en producción!)
    // console.log("🔄 Modelos sincronizados con la base de datos.");

    app.listen(PORT, () => {
      console.log(`🚀 App de asistencia corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

main();
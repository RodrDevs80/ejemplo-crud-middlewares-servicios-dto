import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { sequelize } from "./modules/index.js";
import { errorHandler } from "./core/middlewares/error-handler.middleware.js";

// Importación de Routers
import { administrativoRouter } from "./modules/administrativos/administrativo.routes.js";
import { rolRouter } from './modules/roles/roles.routes.js';
import { docenteRouter } from "./modules/docentes/docentes.routes.js"; 
import { usuarioRouter } from "./modules/usuarios/usuarios.routes.js";
import { mesaExamenRouter } from "./modules/mesaExamenXLegajo/mesaExamenXLegajo.routes.js";
import { movimientoFinancieroRouter } from "./modules/movimientoFinanciero/movimientoFinanciero.routes.js";
import { comprobanteAlumnoRouter } from "./modules/comprobanteAlumno/comprobanteAlumno.routes.js";

// Importación de Modelos (para que sequelize los sincronice)
import "./modules/docentes/model/Docente.js";
import "./modules/usuarios/model/Usuario.js";
import "./modules/mesaExamenXLegajo/model/MesaExamenXLegajo.js";
import "./modules/movimientoFinanciero/model/movimientoFinanciero.js";
import "./modules/comprobanteAlumno/model/ComprobanteAlumno.js";


dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 4000;
const RAIZ: string = "/api/v1";

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Registro de Rutas
app.use(`${RAIZ}/administrativos`, administrativoRouter);
app.use(`${RAIZ}/roles`, rolRouter);
app.use(`${RAIZ}/docentes`, docenteRouter);
app.use(`${RAIZ}/usuarios`, usuarioRouter);
app.use(`${RAIZ}/mesas-examen`, mesaExamenRouter);
app.use(`${RAIZ}/movimientos-financieros`, movimientoFinancieroRouter);
app.use(`${RAIZ}/comprobantes-alumnos`, comprobanteAlumnoRouter);

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
    
    // Sincronización: { alter: true } ajusta tablas existentes
    await sequelize.sync({ alter: true }); 
    console.log("🔄 Modelos sincronizados con la base de datos.");

    app.listen(PORT, () => {
      console.log(`🚀 App de asistencia corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

main();
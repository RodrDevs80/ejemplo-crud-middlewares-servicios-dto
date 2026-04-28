import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { sequelize } from "./modules/index.js";
import { administrativoRouter } from "./modules/administrativos/administrativo.routes.js";
import { errorHandler } from "./core/middlewares/error-handler.middleware.js";
import { rolRouter } from './modules/roles/roles.routes.js';

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 4000;
const RAIZ: string = "/api/v1";

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(`${RAIZ}/administrativos`, administrativoRouter);
app.use(`${RAIZ}/roles`, rolRouter);

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
    await sequelize.sync({ force: true }); // Cambia a 'true' para reiniciar tablas (¡peligroso en producción!)
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
import { Router } from "express";
import { TipoDocumentoRequeridoController } from "./controller/tipoDocumentoRequerido.controller.js";
import { validateJwt } from "../../core/middlewares/validateJwt.js";
import { validateRole } from "../../core/middlewares/validateRole.js";

const router = Router();
const controller = new TipoDocumentoRequeridoController();

// Todas las rutas requieren autenticación
router.use(validateJwt);

// Lectura accesible para usuarios autenticados (se puede ajustar según roles)
router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.getById.bind(controller));

// Solo administradores pueden crear, modificar o eliminar
router.post("/", validateRole(["admin"]), controller.create.bind(controller));
router.patch("/:id", validateRole(["admin"]), controller.update.bind(controller));
router.delete("/:id", validateRole(["admin"]), controller.delete.bind(controller));

export default router;

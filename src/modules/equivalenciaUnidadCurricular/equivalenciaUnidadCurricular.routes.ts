import { Router } from "express";
import EquivalenciaUnidadCurricularController from "./controller/equivalencia-unidad-curricular.controller.js";
import { validateJwt } from "../../core/middlewares/validate-jwt.middleware.js"; // ficticio
import { validateRole } from "../../core/middlewares/validate-role.middleware.js"; // ficticio

const router = Router();

// Todas las rutas requieren autenticación
router.use(validateJwt);

// Solo administradores pueden crear, actualizar o eliminar
router.get("/", EquivalenciaUnidadCurricularController.getAll);
router.get("/:id", EquivalenciaUnidadCurricularController.getById);

router.post("/", validateRole(["Administrador"]), EquivalenciaUnidadCurricularController.create);
router.patch("/:id", validateRole(["Administrador"]), EquivalenciaUnidadCurricularController.update);
router.delete("/:id", validateRole(["Administrador"]), EquivalenciaUnidadCurricularController.delete);

export default router;

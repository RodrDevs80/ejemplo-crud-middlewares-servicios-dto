import { Router } from "express";
import { DocumentoLegajoController } from "./controller/documento-legajo.controller.js";
import { DocumentoLegajoService } from "./service/documento-legajo.service.js";
import { uploadMiddleware } from "./middleware/upload.middleware.js"; // definido abajo
import { validateJwt, validateRole } from "../../core/middlewares/index.js";

// Dependencias (inyección simple)
const fileStorage = new S3FileStorage(); // implementación concreta
const service = new DocumentoLegajoService(fileStorage);
const controller = new DocumentoLegajoController(service);

const router = Router();

router.use(validateJwt); // todas requieren autenticación

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post(
  "/",
  validateRole(["ADMIN", "SECRETARIO"]),
  uploadMiddleware.single("archivo"),
  controller.create
);
router.patch("/:id", validateRole(["ADMIN", "SECRETARIO"]), controller.update);
router.put(
  "/:id/archivo",
  validateRole(["ADMIN", "SECRETARIO"]),
  uploadMiddleware.single("archivo"),
  controller.updateFile
);
router.delete("/:id", validateRole(["ADMIN", "SECRETARIO"]), controller.delete);

export default router;

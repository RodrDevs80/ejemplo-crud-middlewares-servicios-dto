import { Router } from 'express';
import { validateJwt } from '../../core/middlewares/validate-jwt.middleware.js';
import { SesionUsuarioController } from './controller/sesion-usuario.controller.js';

const router = Router();
const controller = new SesionUsuarioController();

// POST no requiere JWT: el usuario no est\u00e1 autenticado al iniciar sesi\u00f3n.
router.post('/', controller.create);

router.use(validateJwt);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;

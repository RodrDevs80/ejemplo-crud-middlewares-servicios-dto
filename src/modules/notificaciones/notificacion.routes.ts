import { Router } from 'express';
import { validateJwt } from '../../core/middlewares/validate-jwt.middleware.js';
import { NotificacionController } from './controller/notificacion.controller.js';

// Rutas del módulo de notificaciones. Todas protegidas por JWT.

const router = Router();
const controller = new NotificacionController();

router.use(validateJwt);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;

import { Router } from 'express';
import { validateJwt } from '../../core/middlewares/validate-jwt.middleware.js';
import { RecuperacionContraseniaController } from './controller/recuperacion-contrasenia.controller.js';

const router = Router();
const controller = new RecuperacionContraseniaController();

// POST no requiere JWT: el usuario aún no está autenticado al solicitar recuperación.
router.post('/', controller.create);

// El resto de endpoints requieren JWT (uso interno / administración).
router.use(validateJwt);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);

export default router;

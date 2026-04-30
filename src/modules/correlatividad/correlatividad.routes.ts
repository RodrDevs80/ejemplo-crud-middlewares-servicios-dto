import { Router } from 'express';
import { CorrelatividadController } from './controller/correlatividad.controller';
import { validateJwt } from '../../core/middlewares/validate-jwt';
import { validateRole } from '../../core/middlewares/validate-role';

const router = Router();

// Aplicar autenticación a todas las rutas
router.use(validateJwt);

// Lectura: cualquier usuario autenticado
router.get('/', CorrelatividadController.getAll);
router.get('/:id', CorrelatividadController.getById);

// Escritura: solo administradores
router.post('/', validateRole('admin'), CorrelatividadController.create);
router.patch('/:id', validateRole('admin'), CorrelatividadController.update);
router.delete('/:id', validateRole('admin'), CorrelatividadController.delete);

export default router;

import { Router } from 'express';
import { comprobanteAlumnoController } from './controller/comprobanteAlumno.controller.js';

export const comprobanteAlumnoRouter = Router();

comprobanteAlumnoRouter.get('/', comprobanteAlumnoController.getAll);
comprobanteAlumnoRouter.get('/:id', comprobanteAlumnoController.getById);
comprobanteAlumnoRouter.post('/', comprobanteAlumnoController.create);
comprobanteAlumnoRouter.patch('/:id', comprobanteAlumnoController.update);
comprobanteAlumnoRouter.delete('/:id', comprobanteAlumnoController.delete);
import { Router } from 'express';
import { movimientoFinancieroController } from './controller/movimientoFinanciero.controller.js';

export const movimientoFinancieroRouter = Router();

movimientoFinancieroRouter.get('/', movimientoFinancieroController.getAll);
movimientoFinancieroRouter.get('/:id', movimientoFinancieroController.getById);
movimientoFinancieroRouter.post('/', movimientoFinancieroController.create);
movimientoFinancieroRouter.patch('/:id', movimientoFinancieroController.update);
movimientoFinancieroRouter.delete('/:id', movimientoFinancieroController.delete);
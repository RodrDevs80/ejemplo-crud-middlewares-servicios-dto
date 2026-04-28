import { Router } from 'express';
import { mesaExamenXLegajoController } from './controller/mesaExamenXLegajo.controller.js';

export const mesaExamenRouter = Router();

mesaExamenRouter.get('/', mesaExamenXLegajoController.getAll);
mesaExamenRouter.get('/:id', mesaExamenXLegajoController.getById);
mesaExamenRouter.post('/', mesaExamenXLegajoController.create);
mesaExamenRouter.patch('/:id', mesaExamenXLegajoController.update);
mesaExamenRouter.delete('/:id', mesaExamenXLegajoController.delete);
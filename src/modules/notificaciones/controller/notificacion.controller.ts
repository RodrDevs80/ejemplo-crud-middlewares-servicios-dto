import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../../core/constants/http.status.js';
import { createNotificacionSchema, updateNotificacionSchema } from '../dto/create-notificacion.dto.js';
import { NotificacionService } from '../service/notificacion.service.js';

// Controlador del módulo de notificaciones.
export class NotificacionController {
  private service = new NotificacionService();

  // GET /notificaciones - Lista con filtros opcionales por query params.
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idEstudiante = req.query.idEstudiante ? Number(req.query.idEstudiante) : undefined;
      const idDocente = req.query.idDocente ? Number(req.query.idDocente) : undefined;
      const idAdministrativo = req.query.idAdministrativo ? Number(req.query.idAdministrativo) : undefined;
      const tipo = req.query.tipo as string | undefined;
      const leida =
        req.query.leida !== undefined ? req.query.leida === 'true' : undefined;

      const data = await this.service.getAllNotificaciones({
        idEstudiante,
        idDocente,
        idAdministrativo,
        tipo,
        leida,
      });

      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      next(error);
    }
  };

  // GET /notificaciones/:id - Obtiene una notificación por ID.
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getNotificacionById(Number(req.params.id));
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      next(error);
    }
  };

  // POST /notificaciones - Crea una nueva notificación.
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = createNotificacionSchema.parse(req.body);
      const data = await this.service.createNotificacion(validatedData);
      res.status(HttpStatus.CREATED).json(data);
    } catch (error) {
      next(error);
    }
  };

  // PUT /notificaciones/:id - Actualiza una notificación existente.
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = updateNotificacionSchema.parse(req.body);
      const data = await this.service.updateNotificacion(Number(req.params.id), validatedData);
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      next(error);
    }
  };

  // DELETE /notificaciones/:id - Elimina una notificación por ID.
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.deleteNotificacion(Number(req.params.id));
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      next(error);
    }
  };
}

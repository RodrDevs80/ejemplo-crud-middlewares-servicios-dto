import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../../core/constants/http.status.js';
import { createRecuperacionSchema, updateRecuperacionSchema } from '../dto/create-recuperacion.dto.js';
import { RecuperacionContraseniaService } from '../service/recuperacion-contrasenia.service.js';

// Controlador de recuperación de contraseña.
// Extrae y valida los datos de entrada, delega la lógica al servicio.
export class RecuperacionContraseniaController {
  private service = new RecuperacionContraseniaService();

  // GET /recuperaciones - Lista todas las solicitudes (requiere JWT).
  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getAllRecuperaciones();
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      next(error);
    }
  };

  // GET /recuperaciones/:id - Obtiene una solicitud por ID (requiere JWT).
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getRecuperacionById(Number(req.params.id));
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      next(error);
    }
  };

  // POST /recuperaciones - Crea una solicitud de recuperación. No requiere JWT.
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = createRecuperacionSchema.parse(req.body);
      const data = await this.service.createRecuperacion(validatedData);
      res.status(HttpStatus.CREATED).json(data);
    } catch (error) {
      next(error);
    }
  };

  // PUT /recuperaciones/:id - Actualiza el estado de una solicitud (requiere JWT).
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = updateRecuperacionSchema.parse(req.body);
      const data = await this.service.updateRecuperacion(Number(req.params.id), validatedData);
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      next(error);
    }
  };
}

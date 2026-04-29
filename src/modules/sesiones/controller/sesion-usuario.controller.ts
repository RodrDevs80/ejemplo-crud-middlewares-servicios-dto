import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../../core/constants/http.status.js';
import { createSesionSchema, updateSesionSchema } from '../dto/create-sesion.dto.js';
import { SesionUsuarioService } from '../service/sesion-usuario.service.js';

// Controlador de sesiones de usuario.
// Extrae y valida los datos de entrada, delega la lógica al servicio.
export class SesionUsuarioController {
  private service = new SesionUsuarioService();

  // GET /sesiones - Lista todas las sesiones (requiere JWT).
  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getAllSesiones();
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      next(error);
    }
  };

  // GET /sesiones/:id - Obtiene una sesión por ID (requiere JWT).
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getSesionById(Number(req.params.id));
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      next(error);
    }
  };

  // POST /sesiones - Crea una nueva sesión. No requiere JWT (es el login).
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = createSesionSchema.parse(req.body);
      const data = await this.service.createSesion(validatedData);
      res.status(HttpStatus.CREATED).json(data);
    } catch (error) {
      next(error);
    }
  };

  // PUT /sesiones/:id - Actualiza una sesión (cierre, bloqueo, intentos fallidos).
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = updateSesionSchema.parse(req.body);
      const data = await this.service.updateSesion(Number(req.params.id), validatedData);
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      next(error);
    }
  };

  // DELETE /sesiones/:id - Elimina una sesión (requiere JWT).
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.deleteSesion(Number(req.params.id));
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      next(error);
    }
  };
}

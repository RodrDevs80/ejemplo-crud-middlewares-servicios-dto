import jwt from 'jsonwebtoken';
import { AppError } from '../../../core/middlewares/error-handler.middleware.js';
import { CreateSesionDto, UpdateSesionDto } from '../dto/create-sesion.dto.js';
import { SesionUsuarioRepository } from '../repository/sesion-usuario.repository.js';

// Servicio de sesiones. Contiene la lógica de negocio del módulo.
export class SesionUsuarioService {
  private repository = new SesionUsuarioRepository();

  async getAllSesiones() {
    return await this.repository.findAll();
  }

  async getSesionById(id: number) {
    const sesion = await this.repository.findById(id);
    if (!sesion) throw AppError.notFound('Sesion no encontrada');
    return sesion;
  }

  // Crea la sesión y genera un JWT para que el cliente lo use en requests protegidos.
  async createSesion(data: CreateSesionDto) {
    const sesion = await this.repository.create(data);

    const token = jwt.sign(
      {
        sesionId: sesion.id,
        idUsuario: data.idUsuario ?? null,
        idDocente: data.idDocente ?? null,
        idAdministrativo: data.idAdministrativo ?? null,
      },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN as any }
    );

    return { token, sesion };
  }

  async updateSesion(id: number, data: UpdateSesionDto) {
    const payload = {
      ...data,
      fechaCierreSesion: data.fechaCierreSesion ? new Date(data.fechaCierreSesion) : undefined,
    };
    const updated = await this.repository.update(id, payload as any);
    if (!updated) throw AppError.notFound('Sesion no encontrada');
    return updated;
  }

  async deleteSesion(id: number) {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw AppError.notFound('Sesion no encontrada');
    return { message: 'Sesion eliminada correctamente' };
  }
}

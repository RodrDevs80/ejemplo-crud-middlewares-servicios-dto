import { AppError } from '../../../core/middlewares/error-handler.middleware.js';
import { CreateNotificacionDto, UpdateNotificacionDto } from '../dto/create-notificacion.dto.js';
import { NotificacionRepository } from '../repository/notificacion.repository.js';

// Filtros opcionales para consulta de notificaciones.
type NotificacionFilter = {
  idEstudiante?: number;
  idDocente?: number;
  idAdministrativo?: number;
  tipo?: string;
  leida?: boolean;
};

// Servicio del módulo de notificaciones.
export class NotificacionService {
  private repository = new NotificacionRepository();

  // Devuelve todas las notificaciones, aplicando filtros opcionales.
  async getAllNotificaciones(filters: NotificacionFilter = {}) {
    return await this.repository.findAll(filters);
  }

  // Busca por ID. Lanza 404 si no existe.
  async getNotificacionById(id: number) {
    const notificacion = await this.repository.findById(id);
    if (!notificacion) throw AppError.notFound('Notificacion no encontrada');
    return notificacion;
  }

  // Crea una nueva notificación.
  async createNotificacion(data: CreateNotificacionDto) {
    return await this.repository.create(data);
  }

  // Actualiza una notificación existente. Lanza 404 si no existe.
  async updateNotificacion(id: number, data: UpdateNotificacionDto) {
    const updated = await this.repository.update(id, data);
    if (!updated) throw AppError.notFound('Notificacion no encontrada');
    return updated;
  }

  // Elimina una notificación. Lanza 404 si no existe.
  async deleteNotificacion(id: number) {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw AppError.notFound('Notificacion no encontrada');
    return { message: 'Notificacion eliminada correctamente' };
  }
}

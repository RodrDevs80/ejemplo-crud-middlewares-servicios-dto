import { WhereOptions } from 'sequelize';
import { CreateNotificacionDto, UpdateNotificacionDto } from '../dto/create-notificacion.dto.js';
import { Notificacion } from '../model/notificacion.model.js';

// Filtros opcionales para búsqueda de notificaciones.
type NotificacionFilter = {
  idEstudiante?: number;
  idDocente?: number;
  idAdministrativo?: number;
  tipo?: string;
  leida?: boolean;
};

// Repositorio del módulo de notificaciones. Centraliza el acceso a la BD.
export class NotificacionRepository {

  // Devuelve todas las notificaciones con filtros opcionales, ordenadas por ID DESC.
  async findAll(filters: NotificacionFilter = {}) {
    const where: WhereOptions = {};

    if (filters.idEstudiante !== undefined) {
      (where as any).idEstudiante = filters.idEstudiante;
    }

    if (filters.idDocente !== undefined) {
      (where as any).idDocente = filters.idDocente;
    }

    if (filters.idAdministrativo !== undefined) {
      (where as any).idAdministrativo = filters.idAdministrativo;
    }

    if (filters.tipo) {
      (where as any).tipo = filters.tipo;
    }

    if (filters.leida !== undefined) {
      (where as any).leida = filters.leida;
    }

    return await Notificacion.findAll({ where, order: [['id', 'DESC']] });
  }

  // Busca por clave primaria. Retorna null si no existe.
  async findById(id: number) {
    return await Notificacion.findByPk(id);
  }

  // Inserta un nuevo registro de notificación.
  async create(data: CreateNotificacionDto) {
    return await Notificacion.create(data as any);
  }

  // Actualiza una notificación. Retorna null si no existe.
  async update(id: number, data: UpdateNotificacionDto) {
    const notificacion = await this.findById(id);
    if (!notificacion) return null;
    return await notificacion.update(data);
  }

  // Elimina físicamente una notificación. Retorna false si no existe.
  async delete(id: number) {
    const notificacion = await this.findById(id);
    if (!notificacion) return false;
    await notificacion.destroy();
    return true;
  }
}

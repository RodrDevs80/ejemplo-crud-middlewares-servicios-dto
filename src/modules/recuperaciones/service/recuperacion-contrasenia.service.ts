import { AppError } from '../../../core/middlewares/error-handler.middleware.js';
import { CreateRecuperacionDto, UpdateRecuperacionDto } from '../dto/create-recuperacion.dto.js';
import { RecuperacionContraseniaRepository } from '../repository/recuperacion-contrasenia.repository.js';

// Servicio de recuperación de contraseña. Contiene la lógica de negocio del módulo.
export class RecuperacionContraseniaService {
  private repository = new RecuperacionContraseniaRepository();

  async getAllRecuperaciones() {
    return await this.repository.findAll();
  }

  async getRecuperacionById(id: number) {
    const recuperacion = await this.repository.findById(id);
    if (!recuperacion) throw AppError.notFound('Solicitud de recuperacion no encontrada');
    return recuperacion;
  }

  async createRecuperacion(data: CreateRecuperacionDto) {
    // La fecha de expiración se calcula automáticamente: 1 hora desde ahora.
    const fechaExpiracion = new Date(Date.now() + 60 * 60 * 1000);
    return await this.repository.create({ ...data, fechaExpiracion });
  }

  async updateRecuperacion(id: number, data: UpdateRecuperacionDto) {
    // Si se marca como usado, se registra automáticamente la fecha de uso.
    const payload = {
      ...data,
      fechaUso: data.usado === true ? new Date() : undefined,
    };
    const updated = await this.repository.update(id, payload);
    if (!updated) throw AppError.notFound('Solicitud de recuperacion no encontrada');
    return updated;
  }
}

import { CreateRecuperacionDto, UpdateRecuperacionDto } from '../dto/create-recuperacion.dto.js';
import { RecuperacionContrasenia } from '../model/recuperacion-contrasenia.model.js';

// Repositorio de recuperación de contraseña. Centraliza el acceso a la BD.
export class RecuperacionContraseniaRepository {
  async findAll() {
    return await RecuperacionContrasenia.findAll({ order: [['id', 'DESC']] });
  }

  async findById(id: number) {
    return await RecuperacionContrasenia.findByPk(id);
  }

  // Recibe los datos del DTO más la fechaExpiracion calculada por el servicio.
  async create(data: CreateRecuperacionDto & { fechaExpiracion: Date }) {
    return await RecuperacionContrasenia.create(data as any);
  }

  async update(id: number, data: UpdateRecuperacionDto & { fechaUso?: Date }) {
    const recuperacion = await this.findById(id);
    if (!recuperacion) return null;
    return await recuperacion.update(data);
  }
}

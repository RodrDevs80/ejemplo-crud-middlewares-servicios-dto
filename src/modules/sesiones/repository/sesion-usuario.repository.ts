import { CreateSesionDto, UpdateSesionDto } from '../dto/create-sesion.dto.js';
import { SesionUsuario } from '../model/sesion-usuario.model.js';

// Repositorio de sesiones. Centraliza el acceso a la BD.
export class SesionUsuarioRepository {
  async findAll() {
    return await SesionUsuario.findAll({ order: [['id', 'DESC']] });
  }

  async findById(id: number) {
    return await SesionUsuario.findByPk(id);
  }

  async create(data: CreateSesionDto) {
    return await SesionUsuario.create(data as any);
  }

  async update(id: number, data: UpdateSesionDto & { fechaCierreSesion?: Date }) {
    const sesion = await this.findById(id);
    if (!sesion) return null;
    return await sesion.update(data);
  }

  async delete(id: number) {
    const sesion = await this.findById(id);
    if (!sesion) return false;
    await sesion.destroy();
    return true;
  }
}

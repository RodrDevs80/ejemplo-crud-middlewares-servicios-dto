import Correlatividad from '../model/Correlatividad';
import type { CreateCorrelatividadDto } from '../dto/create-correlatividad.dto';
import type { UpdateCorrelatividadDto } from '../dto/update-correlatividad.dto';
import { NotFoundError } from '../../../core/errors'; // Error personalizado opcional

export class CorrelatividadService {
  async getAll(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const { count: total, rows: data } = await Correlatividad.findAndCountAll({
      offset,
      limit,
      order: [['id', 'ASC']],
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: number) {
    const correlatividad = await Correlatividad.findByPk(id);
    if (!correlatividad) {
      throw new NotFoundError(`Correlatividad con id ${id} no encontrada`);
    }
    return correlatividad;
  }

  async create(data: CreateCorrelatividadDto) {
    return Correlatividad.create(data);
  }

  async update(id: number, data: UpdateCorrelatividadDto) {
    const correlatividad = await this.getById(id); // lanza NotFoundError si no existe
    await correlatividad.update(data);
    return correlatividad;
  }

  async delete(id: number) {
    const correlatividad = await this.getById(id);
    await correlatividad.destroy();
    return { message: `Correlatividad con id ${id} eliminada correctamente` };
  }
}

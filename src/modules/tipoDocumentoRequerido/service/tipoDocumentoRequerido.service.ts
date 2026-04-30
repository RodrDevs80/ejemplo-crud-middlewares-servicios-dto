import TipoDocumentoRequerido from "../model/TipoDocumentoRequerido.js";
import {
  CreateTipoDocumentoRequeridoDto,
  UpdateTipoDocumentoRequeridoDto,
} from "../dto/create-tipo-documento-requerido.dto.js";

export class TipoDocumentoRequeridoService {
  async getAll(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const { rows, count: total } =
      await TipoDocumentoRequerido.findAndCountAll({
        offset,
        limit,
        order: [["id", "ASC"]],
      });

    return {
      data: rows,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: number) {
    const registro = await TipoDocumentoRequerido.findByPk(id);
    return registro;
  }

  async create(data: CreateTipoDocumentoRequeridoDto) {
    const nuevo = await TipoDocumentoRequerido.create(data);
    return nuevo;
  }

  async update(id: number, data: UpdateTipoDocumentoRequeridoDto) {
    const registro = await this.getById(id);
    if (!registro) return null;
    await registro.update(data);
    return registro;
  }

  async delete(id: number) {
    const registro = await this.getById(id);
    if (!registro) return null;
    await registro.destroy();
    return registro;
  }
}

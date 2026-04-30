import EquivalenciaUnidadCurricular from "../model/EquivalenciaUnidadCurricular.js";
import { CreateEquivalenciaUnidadCurricularDto, UpdateEquivalenciaUnidadCurricularDto } from "../dto/index.js";
import { FindAndCountOptions, WhereOptions } from "sequelize";

class EquivalenciaUnidadCurricularService {
  async getAll(page: number = 1, limit: number = 10, filters?: WhereOptions<EquivalenciaUnidadCurricular>) {
    const offset = (page - 1) * limit;

    const options: FindAndCountOptions<EquivalenciaUnidadCurricular> = {
      where: filters,
      limit,
      offset,
      order: [["id", "ASC"]],
    };

    const { count, rows } = await EquivalenciaUnidadCurricular.findAndCountAll(options);

    return {
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async getById(id: number) {
    return await EquivalenciaUnidadCurricular.findByPk(id);
  }

  async create(data: CreateEquivalenciaUnidadCurricularDto) {
    return await EquivalenciaUnidadCurricular.create(data);
  }

  async update(id: number, data: UpdateEquivalenciaUnidadCurricularDto) {
    const entity = await EquivalenciaUnidadCurricular.findByPk(id);
    if (!entity) {
      throw new Error("EquivalenciaUnidadCurricular no encontrada");
    }
    await entity.update(data);
    return entity;
  }

  async delete(id: number) {
    const entity = await EquivalenciaUnidadCurricular.findByPk(id);
    if (!entity) {
      throw new Error("EquivalenciaUnidadCurricular no encontrada");
    }
    await entity.destroy();
    return { message: "EquivalenciaUnidadCurricular eliminada correctamente" };
  }
}

export default new EquivalenciaUnidadCurricularService();

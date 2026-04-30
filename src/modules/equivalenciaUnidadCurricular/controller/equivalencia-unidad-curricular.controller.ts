import { Request, Response, NextFunction } from "express";
import EquivalenciaUnidadCurricularService from "../service/equivalencia-unidad-curricular.service.js";
import { CreateEquivalenciaUnidadCurricularDto, UpdateEquivalenciaUnidadCurricularDto } from "../dto/index.js";
import { parsePagination } from "../../../core/utils/pagination.utils.js"; // ficticio
import { respondZodError } from "../../../core/utils/response.utils.js"; // ficticio

class EquivalenciaUnidadCurricularController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = parsePagination(req.query);
      const { filters } = req.query; // Podría venir como JSON string
      const parsedFilters = filters ? JSON.parse(filters as string) : {};

      const result = await EquivalenciaUnidadCurricularService.getAll(page, limit, parsedFilters);
      res.status(200).json({ status: "success", data: result });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const entity = await EquivalenciaUnidadCurricularService.getById(Number(id));
      if (!entity) {
        res.status(404).json({ status: "error", message: "EquivalenciaUnidadCurricular no encontrada" });
        return;
      }
      res.status(200).json({ status: "success", data: entity });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = CreateEquivalenciaUnidadCurricularDto.safeParse(req.body);
      if (!parsed.success) {
        return respondZodError(res, parsed.error);
      }

      const newEntity = await EquivalenciaUnidadCurricularService.create(parsed.data);
      res.status(201).json({ status: "success", data: newEntity });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const parsed = UpdateEquivalenciaUnidadCurricularDto.safeParse(req.body);
      if (!parsed.success) {
        return respondZodError(res, parsed.error);
      }

      const updatedEntity = await EquivalenciaUnidadCurricularService.update(Number(id), parsed.data);
      res.status(200).json({ status: "success", data: updatedEntity });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await EquivalenciaUnidadCurricularService.delete(Number(id));
      res.status(200).json({ status: "success", data: result });
    } catch (error) {
      next(error);
    }
  }
}

export default new EquivalenciaUnidadCurricularController();

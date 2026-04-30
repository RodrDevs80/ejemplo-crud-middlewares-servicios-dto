import { Request, Response, NextFunction } from "express";
import { TipoDocumentoRequeridoService } from "../service/tipoDocumentoRequerido.service.js";
import {
  CreateTipoDocumentoRequeridoDto,
  UpdateTipoDocumentoRequeridoDto,
} from "../dto/create-tipo-documento-requerido.dto.js";
import { respondZodError } from "../../../core/utils/respondZodError.js";
import { parsePagination } from "../../../core/utils/parsePagination.js";

const service = new TipoDocumentoRequeridoService();

export class TipoDocumentoRequeridoController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = parsePagination(req.query);
      const result = await service.getAll(page, limit);
      res.status(200).json({ status: "success", ...result });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res
          .status(400)
          .json({ status: "error", message: "ID inválido" });
      }
      const registro = await service.getById(id);
      if (!registro) {
        return res
          .status(404)
          .json({ status: "error", message: "Tipo de documento no encontrado" });
      }
      res.status(200).json({ status: "success", data: registro });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = CreateTipoDocumentoRequeridoDto.safeParse(req.body);
      if (!parsed.success) {
        return respondZodError(res, parsed.error);
      }
      const registro = await service.create(parsed.data);
      res.status(201).json({ status: "success", data: registro });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res
          .status(400)
          .json({ status: "error", message: "ID inválido" });
      }
      const parsed = UpdateTipoDocumentoRequeridoDto.safeParse(req.body);
      if (!parsed.success) {
        return respondZodError(res, parsed.error);
      }
      const registro = await service.update(id, parsed.data);
      if (!registro) {
        return res
          .status(404)
          .json({ status: "error", message: "Tipo de documento no encontrado" });
      }
      res.status(200).json({ status: "success", data: registro });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res
          .status(400)
          .json({ status: "error", message: "ID inválido" });
      }
      const registro = await service.delete(id);
      if (!registro) {
        return res
          .status(404)
          .json({ status: "error", message: "Tipo de documento no encontrado" });
      }
      res.status(200).json({
        status: "success",
        message: "Tipo de documento eliminado correctamente",
        data: registro,
      });
    } catch (error) {
      next(error);
    }
  }
}

import { Request, Response, NextFunction } from "express";
import { DocumentoLegajoService } from "../service/documento-legajo.service.js";
import { CreateDocumentoLegajoDto, UpdateDocumentoLegajoDto } from "../dto/index.js";
import { parsePagination } from "../../../core/utils/pagination.js"; // función ficticia
import { respondZodError } from "../../../core/utils/zod-error.js"; // función ficticia

export class DocumentoLegajoController {
  constructor(private service: DocumentoLegajoService) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit } = parsePagination(req.query);
      const result = await this.service.getAll(page, limit);
      res.status(200).json({ status: "success", data: result.data, meta: result.meta });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const documento = await this.service.getById(Number(id));
      res.status(200).json({ status: "success", data: documento });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return res.status(400).json({ status: "error", message: "Archivo requerido" });
      }

      const parsed = CreateDocumentoLegajoDto.safeParse(req.body);
      if (!parsed.success) return respondZodError(res, parsed.error);

      const documento = await this.service.create(
        parsed.data,
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype
      );
      res.status(201).json({ status: "success", data: documento });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const parsed = UpdateDocumentoLegajoDto.safeParse(req.body);
      if (!parsed.success) return respondZodError(res, parsed.error);

      const documento = await this.service.update(Number(id), parsed.data);
      res.status(200).json({ status: "success", data: documento });
    } catch (error) {
      next(error);
    }
  };

  updateFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!req.file) {
        return res.status(400).json({ status: "error", message: "Archivo requerido" });
      }

      const documento = await this.service.updateFile(
        Number(id),
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype
      );
      res.status(200).json({ status: "success", data: documento });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.service.delete(Number(id));
      res.status(200).json({ status: "success", data: result });
    } catch (error) {
      next(error);
    }
  };
}

import { Request, Response, NextFunction } from 'express';
import { CorrelatividadService } from '../service/correlatividad.service';
import { CreateCorrelatividadDto } from '../dto/create-correlatividad.dto';
import { UpdateCorrelatividadDto } from '../dto/update-correlatividad.dto';
import { respondZodError } from '../../../core/utils/response-utils';
import { parsePagination } from '../../../core/utils/pagination-utils';

const service = new CorrelatividadService();

export class CorrelatividadController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = parsePagination(req.query);
      const result = await service.getAll(page, limit);
      res.status(200).json({ status: 'success', data: result });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const correlatividad = await service.getById(id);
      res.status(200).json({ status: 'success', data: correlatividad });
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = CreateCorrelatividadDto.safeParse(req.body);
      if (!parsed.success) {
        return respondZodError(res, parsed.error);
      }
      const correlatividad = await service.create(parsed.data);
      res.status(201).json({ status: 'success', data: correlatividad });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const parsed = UpdateCorrelatividadDto.safeParse(req.body);
      if (!parsed.success) {
        return respondZodError(res, parsed.error);
      }
      const correlatividad = await service.update(id, parsed.data);
      res.status(200).json({ status: 'success', data: correlatividad });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await service.delete(id);
      res.status(200).json({ status: 'success', data: result });
    } catch (err) {
      next(err);
    }
  }
}

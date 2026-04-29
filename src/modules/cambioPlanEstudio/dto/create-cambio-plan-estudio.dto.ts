import { z } from 'zod';

export const CreateCambioPlanEstudioDto = z.object({
  idLegajo: z.number().int().positive(),
  idPlanEstudioOrigen: z.number().int().positive(),
  idPlanEstudioDestino: z.number().int().positive(),
  idUsuarioGestor: z.number().int().positive(),
  fechaSolicitud: z.date().optional(), // si no se envía, el modelo usa defaultValue
  fechaAprobacion: z.date().nullable().optional(),
  plazoVencimiento: z.date().nullable().optional(),
  estado: z.enum(['PENDIENTE', 'APROBADO', 'RECHAZADO']).default('PENDIENTE'),
  observaciones: z.string().nullable().optional(),
  idAdministrativo: z.number().int().positive(),
});

export type CreateCambioPlanEstudioDto = z.infer<typeof CreateCambioPlanEstudioDto>;
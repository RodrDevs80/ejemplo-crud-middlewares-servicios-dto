import { z } from "zod";

export const CreateEquivalenciaUnidadCurricularDto = z.object({
  idPlanEstudioOrigen: z.number().int().positive(),
  idPlanEstudioDestino: z.number().int().positive(),
  idUnidadCurricularOrigen: z.number().int().positive(),
  idUnidadCurricularDestino: z.number().int().positive(),
  tipoEquivalencia: z.enum(["TOTAL", "PARCIAL"]),
  observaciones: z.string().nullable().optional(),
  idAdministrativo: z.number().int().positive(),
});

export type CreateEquivalenciaUnidadCurricularDto = z.infer<typeof CreateEquivalenciaUnidadCurricularDto>;

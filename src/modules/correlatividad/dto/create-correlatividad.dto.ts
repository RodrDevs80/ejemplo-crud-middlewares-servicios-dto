import { z } from 'zod';

export const CreateCorrelatividadDto = z.object({
  plan_id: z.number().int().positive('El plan debe ser un entero positivo'),
  asignatura_id: z.number().int().positive('La asignatura debe ser un entero positivo'),
  asignatura_correlativa_id: z.number().int().positive('La asignatura correlativa debe ser un entero positivo'),
  condicion: z.enum(['REGULARIZADA', 'APROBADA']).optional().default('REGULARIZADA'),
});

export type CreateCorrelatividadDto = z.infer<typeof CreateCorrelatividadDto>;

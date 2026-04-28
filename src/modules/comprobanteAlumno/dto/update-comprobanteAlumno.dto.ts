import { z } from 'zod';
import { CreateComprobanteAlumnoSchema } from './create-comprobanteAlumno.dto.js';

export const UpdateComprobanteAlumnoSchema = CreateComprobanteAlumnoSchema.partial();

export type UpdateComprobanteAlumnoDto = z.infer<typeof UpdateComprobanteAlumnoSchema>;
import { z } from 'zod';

// DTO del módulo de notificaciones.

// Schema de creación.
export const createNotificacionSchema = z.object({
  idEstudiante: z.number().int().positive().nullable().optional(),
  idDocente: z.number().int().positive().nullable().optional(),
  idAdministrativo: z.number().int().positive().nullable().optional(),
  titulo: z.string().min(3, 'Titulo invalido'),
  mensaje: z.string().min(3, 'Mensaje invalido'),
  tipo: z.string().min(1, 'Tipo invalido'),
  entidadRelacionada: z.string().nullable().optional(),
  entidadId: z.number().int().positive().nullable().optional(),
  leida: z.boolean().optional(),
});

// Schema de actualización: todos los campos opcionales.
export const updateNotificacionSchema = createNotificacionSchema.partial();

export type CreateNotificacionDto = z.infer<typeof createNotificacionSchema>;
export type UpdateNotificacionDto = z.infer<typeof updateNotificacionSchema>;

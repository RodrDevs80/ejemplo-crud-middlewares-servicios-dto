import { z } from 'zod';

// Schema de creación: requiere al menos uno de los tres destinatarios posibles.
export const createRecuperacionSchema = z
  .object({
    idUsuario: z.number().int().positive().optional(),
    idAdministrativo: z.number().int().positive().optional(),
    idDocente: z.number().int().positive().optional(),
  })
  .refine(
    (data) =>
      data.idUsuario !== undefined ||
      data.idAdministrativo !== undefined ||
      data.idDocente !== undefined,
    { message: 'Debe enviar idUsuario, idAdministrativo o idDocente' }
  );

// Schema de actualización: permite marcar la solicitud como usada.
export const updateRecuperacionSchema = z.object({
  usado: z.boolean().optional(),
});

export type CreateRecuperacionDto = z.infer<typeof createRecuperacionSchema>;
export type UpdateRecuperacionDto = z.infer<typeof updateRecuperacionSchema>;

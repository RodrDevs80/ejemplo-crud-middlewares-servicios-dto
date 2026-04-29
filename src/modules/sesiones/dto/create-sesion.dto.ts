import { z } from 'zod';

// Schema de creación: requiere al menos uno de los tres destinatarios posibles.
export const createSesionSchema = z
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
    { message: 'Debe enviar idUsuario, idAdministrativo o idDocente para iniciar sesion' }
  );

// Schema de actualización: permite registrar cierre de sesión,
// actualizar intentos fallidos o cambiar el estado de bloqueo.
export const updateSesionSchema = z.object({
  fechaCierreSesion: z.string().datetime().optional(),
  intentoFallido: z.number().int().min(0).optional(),
  bloqueado: z.boolean().optional(),
});

export type CreateSesionDto = z.infer<typeof createSesionSchema>;
export type UpdateSesionDto = z.infer<typeof updateSesionSchema>;

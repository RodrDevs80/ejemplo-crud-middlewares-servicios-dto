import { z } from 'zod';

export const CreateEstudianteDto = z.object({
    dni: z.number().int().positive('El DNI debe ser un número positivo'),
    nombre: z.string().trim().min(1, 'El nombre es obligatorio'),
    apellido: z.string().trim().min(1, 'El apellido es obligatorio'),
    email: z.string().email('Debe ser un email válido'),
    telefono: z.string().trim().min(1, 'El teléfono es obligatorio'),
    domicilio: z.string().trim().min(1, 'El domicilio es obligatorio'),
    foto: z.string().nullable().optional(),
    trabaja: z.boolean().nullable().optional(),
    activo: z.boolean().optional().default(true),
    idUsuario: z.number().int().positive(),
    idAdministrativo: z.number().int().positive(),
});

export type CreateEstudianteDto = z.infer<typeof CreateEstudianteDto>;
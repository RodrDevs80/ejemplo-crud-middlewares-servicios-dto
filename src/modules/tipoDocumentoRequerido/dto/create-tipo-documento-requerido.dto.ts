import { z } from "zod";

export const CreateTipoDocumentoRequeridoDto = z.object({
  idCarrera: z.number().int().positive("Debe indicar una carrera válida"),
  nombreDocumento: z
    .string()
    .min(1, "El nombre del documento es obligatorio")
    .max(100),
  obligatorio: z.boolean().optional().default(true),
  esCritico: z.boolean().optional().default(false),
  descripcion: z.string().nullable().optional(),
  diasVigencia: z
    .number()
    .int()
    .positive("Los días de vigencia deben ser un número positivo")
    .nullable()
    .optional(),
  idAdministrativo: z.number().int().positive("Debe indicar un administrativo válido"),
});

export type CreateTipoDocumentoRequeridoDto = z.infer<
  typeof CreateTipoDocumentoRequeridoDto
>;

import { z } from "zod";

export const CreateDocumentoLegajoDto = z.object({
  idLegajo: z.number({ required_error: "idLegajo es requerido" }).int().positive(),
  idTipoDocumentoRequerido: z.number({ required_error: "idTipoDocumentoRequerido es requerido" }).int().positive(),
  idUsuarioCarga: z.number().int().positive(),
  fechaVencimiento: z.string().date().nullable().optional(),
  idAdministrativo: z.number().int().positive(),
  // El archivo se maneja aparte con multer, no va en el DTO
});

export type CreateDocumentoLegajoDto = z.infer<typeof CreateDocumentoLegajoDto>;

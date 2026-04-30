import { CreateTipoDocumentoRequeridoDto } from "./create-tipo-documento-requerido.dto.js";

export const UpdateTipoDocumentoRequeridoDto = CreateTipoDocumentoRequeridoDto.partial();
export type UpdateTipoDocumentoRequeridoDto = z.infer<
  typeof UpdateTipoDocumentoRequeridoDto
>;

import { CreateDocumentoLegajoDto } from "./create-documento-legajo.dto";

export const UpdateDocumentoLegajoDto = CreateDocumentoLegajoDto.partial();
export type UpdateDocumentoLegajoDto = typeof UpdateDocumentoLegajoDto;

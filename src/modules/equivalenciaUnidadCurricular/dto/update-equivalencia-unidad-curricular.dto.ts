import { CreateEquivalenciaUnidadCurricularDto } from "./create-equivalencia-unidad-curricular.dto";

export const UpdateEquivalenciaUnidadCurricularDto = CreateEquivalenciaUnidadCurricularDto.partial();

export type UpdateEquivalenciaUnidadCurricularDto = Partial<CreateEquivalenciaUnidadCurricularDto>;

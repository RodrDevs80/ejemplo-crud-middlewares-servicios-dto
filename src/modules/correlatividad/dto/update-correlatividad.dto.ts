import { CreateCorrelatividadDto } from './create-correlatividad.dto';

export const UpdateCorrelatividadDto = CreateCorrelatividadDto.partial();

export type UpdateCorrelatividadDto = typeof UpdateCorrelatividadDto._type;

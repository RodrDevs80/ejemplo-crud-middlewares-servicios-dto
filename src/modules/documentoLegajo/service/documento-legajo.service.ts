import DocumentoLegajo from "../model/DocumentoLegajo.js";
import { CreateDocumentoLegajoDto, UpdateDocumentoLegajoDto } from "../dto/index.js";
import { IFileStorage } from "../../../core/interfaces/file-storage.interface.js";

export class DocumentoLegajoService {
  constructor(private fileStorage: IFileStorage) {}

  async getAll(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const { count, rows } = await DocumentoLegajo.findAndCountAll({
      limit,
      offset,
      order: [["fechaCarga", "DESC"]],
    });
    return {
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async getById(id: number) {
    const documento = await DocumentoLegajo.findByPk(id);
    if (!documento) throw new Error("Documento no encontrado");
    return documento;
  }

  async create(
    data: CreateDocumentoLegajoDto,
    archivoBuffer: Buffer,
    originalName: string,
    mimeType: string
  ) {
    // 1. Subir archivo al storage
    const url = await this.fileStorage.upload({
      buffer: archivoBuffer,
      originalName,
      mimeType,
    });

    // 2. Crear registro en BD
    const documento = await DocumentoLegajo.create({
      ...data,
      urlArchivo: url,
      fechaCarga: new Date(),
      estado: "PENDIENTE",
    });
    return documento;
  }

  async update(id: number, data: UpdateDocumentoLegajoDto) {
    const documento = await this.getById(id);
    await documento.update(data);
    return documento;
  }

  async updateFile(id: number, archivoBuffer: Buffer, originalName: string, mimeType: string) {
    const documento = await this.getById(id);
    // Subir nuevo archivo (opcional: eliminar el anterior)
    const newUrl = await this.fileStorage.upload({
      buffer: archivoBuffer,
      originalName,
      mimeType,
    });
    await documento.update({ urlArchivo: newUrl });
    return documento;
  }

  async delete(id: number) {
    const documento = await this.getById(id);
    // Opcional: eliminar archivo del storage
    await this.fileStorage.delete(documento.urlArchivo);
    await documento.destroy();
    return { message: "Documento eliminado" };
  }
}

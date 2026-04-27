# Sistema de Gestión de Asistencia - Backend

API RESTful para la gestión de administrativos, roles y (futuramente) otras entidades de una institución educativa. Desarrollada con Node.js + TypeScript, Express 5, Sequelize (MySQL) y buenas prácticas como validación con Zod, hasheo de contraseñas, control de errores centralizado y arquitectura por capas.

---

## 🚀 Tecnologías principales

| Tecnología               | Propósito                                                                      |
| ------------------------ | ------------------------------------------------------------------------------ |
| **Node.js + TypeScript** | Entorno de ejecución y tipado estático para mayor robustez.                    |
| **Express 5**            | Framework web para definir rutas y middlewares.                                |
| **Sequelize**            | ORM que facilita la interacción con MySQL (modelos, relaciones, validaciones). |
| **MySQL2**               | Driver para conectar Sequelize con MySQL.                                      |
| **Zod**                  | Validación de datos de entrada (DTOs) con esquemas declarativos.               |
| **bcrypt**               | Hashing de contraseñas antes de almacenarlas.                                  |
| **Morgan**               | Logging de peticiones HTTP en desarrollo.                                      |
| **CORS**                 | Habilita peticiones desde dominios externos.                                   |
| **dotenv**               | Manejo de variables de entorno.                                                |
| **tsx**                  | Ejecución en caliente durante desarrollo (`tsx watch`).                        |

---

## 📁 Estructura del proyecto (explicada)

```plaintext
src/
├── config/database/          # Configuración de Sequelize
│   ├── conexion.ts           # Instancia de Sequelize
│   └── configDataBase.ts     # Carga de credenciales desde .env
├── core/                     # Componentes reutilizables
│   ├── enums/                # Enums globales (Role)
│   └── middlewares/          # Manejo de errores, JWT, autorización
├── modules/                  # Módulo por entidad (Administrativo, Rol)
│   ├── administrativos/
│   │   ├── controller/       # Controlador (lógica HTTP)
│   │   ├── dto/              # Esquemas Zod para validación
│   │   ├── model/            # Modelo Sequelize + hooks (hash)
│   │   ├── service/          # Lógica de negocio (acceso a datos)
│   │   └── administrativo.routes.ts
│   ├── roles/
│   │   └── ... (misma estructura)
│   └── index.ts              # Agrupa modelos y define relaciones
└── index.ts                  # Punto de entrada (configura Express, sincroniza DB)
```

### ¿Por qué esta estructura?

- **Modularidad**: cada entidad vive en su propia carpeta (controlador, servicio, DTO, modelo, rutas). Facilita agregar nuevas entidades y distribuir responsabilidades.
- **Separación de capas**:
  - **Rutas** → definen endpoints y aplican middlewares (autenticación, roles).
  - **Controlador** → extrae/parsea datos de la request, llama al servicio, envía respuesta.
  - **Servicio** → contiene la lógica de negocio y acceso a la base de datos (Sequelize).
  - **DTO (Zod)** → valida la forma y tipos de los datos entrantes.
  - **Modelo (Sequelize)** → define la tabla, columnas, tipos, validaciones y hooks.
- **Centralización de relaciones**: en `modules/index.ts` se declaran las asociaciones entre modelos (ej. `Rol.hasMany(Administrativo)`). Esto evita dependencias circulares y facilita la importación.

---

## 🔧 Configuración inicial

### 1. Requisitos previos

- Node.js 18+ y npm.
- MySQL Server (local o remoto).

### 2. Clonar e instalar dependencias

```bash
git clone <repo>
cd back
npm install
```

### 3. Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido (ajusta los valores):

```env
# App
PORT=4000

# Database
DB_NAME=nombre_db
DB_USER_M=root
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_DIALECT_M=mysql
```

**Explicación**:  
`DB_DIALECT_M` es el dialecto que usa Sequelize. Se valida al inicio; si falta alguna variable, el servidor no arrancará.

### 4. Crear la base de datos vacía (opcional)

```sql
CREATE DATABASE IF NOT EXISTS asistencia_db;
```

Si usas `force: true` en `sequelize.sync()`, Sequelize creará las tablas automáticamente (ver abajo). En producción **nunca** uses `force: true`.

### 5. Ejecutar en modo desarrollo

```bash
npm run dev
```

Esto lanza el servidor con **tsx --watch**, que reinicia automáticamente al detectar cambios.

### 6. Build y producción

```bash
npm run build    # compila a ./dist
npm start        # ejecuta el código compilado
```

---

## 🗄️ Base de datos y modelos

### Sincronización (archivo `src/index.ts`)

```ts
await sequelize.sync({ force: false }); // con false no borra datos existentes
```

- **`force: false`** (por defecto): crea la tabla si no existe, pero no altera columnas si el modelo cambia. Ideal para desarrollo.
- **`force: true`**: elimina las tablas y las vuelve a crear (peligroso, solo para pruebas iniciales).

### Modelo `Administrativo` – puntos didácticos

- **Hooks**:
  - `beforeValidate`: normaliza email, trim.
  - `beforeCreate` / `beforeUpdate`: hashea la contraseña automáticamente con `bcrypt`.
  - **Razón** → la lógica de hasheo queda encapsulada en el modelo, no en el servicio. Así evitamos olvidar hashear la contraseña.
- **Método de instancia** `validarContrasenia`: útil para login (comparación con hash).
- **Atributos excluidos**: en el servicio se usa `attributes: { exclude: ['contrasenia'] }` para nunca devolver la contraseña al cliente.
- **Relaciones**: en `modules/index.ts` se establece `Rol.hasMany` y `Administrativo.belongsTo`. Esto agrega automáticamente la clave foránea `idRol` en la tabla `administrativos`.

### Modelo `Rol` – ejemplo simple sin hooks.

---

## 🛡️ Validación de datos con Zod

En lugar de validar manualmente en el controlador, definimos **DTOs** con Zod:

```ts
// create-administrativo.dto.ts
export const CreateAdministrativoDto = z.object({
  nombre: z.string().trim().min(1),
  email: z.string().email(),
  contrasenia: z.string().min(6),
  // ...
});
```

**Ventajas**:

- Validación declarativa y reutilizable.
- Mensajes de error automáticos.
- Integración perfecta con TypeScript (inferencia de tipos).
- **Seguridad**: evita que datos malformados o fields extra lleguen al servicio.

En el controlador:

```ts
const parsed = CreateAdministrativoDto.safeParse(req.body);
if (!parsed.success) return respondZodError(res, parsed.error);
// parsed.data tiene el objeto validado y tipado
```

---

## 🔐 Autenticación y autorización (placeholder)

Los middlewares `validateJwt` y `validateRole` están incluidos, pero **la lógica de JWT no está implementada** intencionalmente en este ejemplo.

- `validateJwt`: debe leer el header `Authorization`, verificar el token y cargar `req.user` con al menos `id` y `rol`.
- `validateRole(...rolesPermitidos)` chequea que `req.user.rol` esté incluido en la lista.

**Razón**: el enfoque del código es mostrar **cómo se integran** estos middlewares en las rutas. Para que el ejemplo funcione inmediatamente, se simula un usuario `ADMIN`. El desarrollador deberá reemplazar la parte de JWT según su implementación real.

Ejemplo de ruta protegida:

```ts
administrativoRouter.post(
  "/",
  validateJwt, // cualquiera autenticado
  validateRole(Role.ADMIN), // solo ADMIN puede crear
  administrativoController.create
);
```

---

## 📍 Endpoints de la API

Base URL: `http://localhost:4000/api/v1`

### Administrativos

| Método | Ruta                 | Middlewares         | Descripción                      |
| ------ | -------------------- | ------------------- | -------------------------------- |
| GET    | /administrativos     | validateJwt         | Lista paginada (sin contraseñas) |
| GET    | /administrativos/:id | validateJwt         | Obtener uno                      |
| POST   | /administrativos     | validateJwt + ADMIN | Crear nuevo (hash automático)    |
| PATCH  | /administrativos/:id | validateJwt + ADMIN | Actualizar campos (parcial)      |
| DELETE | /administrativos/:id | validateJwt + ADMIN | Eliminar físico                  |

### Roles

| Método | Ruta       | Middlewares         | Descripción             |
| ------ | ---------- | ------------------- | ----------------------- |
| GET    | /roles     | validateJwt         | Lista paginada de roles |
| GET    | /roles/:id | validateJwt         | Obtener un rol          |
| POST   | /roles     | validateJwt + ADMIN | Crear nuevo rol         |
| PATCH  | /roles/:id | validateJwt + ADMIN | Actualizar rol          |
| DELETE | /roles/:id | validateJwt + ADMIN | Eliminar rol            |

### Health check

`GET /health` → respuesta simple para verificar que la app está corriendo.

---

## 📦 Paginación

Todos los endpoints `GET` de lista soportan paginación mediante query params:

```
GET /api/v1/administrativos?page=2&limit=15
```

- `page`: número de página (por defecto 1)
- `limit`: cantidad por página (por defecto 10, máximo 100)

Respuesta:

```json
{
  "status": "success",
  "data": [ ... ],
  "meta": {
    "total": 42,
    "page": 2,
    "limit": 15,
    "totalPages": 3
  }
}
```

**Razón**: es una práctica estándar para evitar enviar demasiados registros de una vez y mejorar el rendimiento.

---

## 🧯 Manejo de errores centralizado

El middleware `errorHandler` (aplicado al final de la cadena) captura cualquier error que se pase a `next(err)`. Clasifica:

1. **AppError** (errores personalizados de negocio): responde con el código y mensaje dados.
2. **ZodError**: rareza porque ya validamos antes, pero como fallback devuelve 400.
3. **Errores de Sequelize**:
   - `ValidationError`: 422 (violación de restricciones del modelo)
   - `UniqueConstraintError`: 409 (duplicado)
   - `ForeignKeyConstraintError`: 422 (referencia inválida)
4. Cualquier otro error → 500 (y en desarrollo muestra el mensaje real).

**Beneficio**: el controlador no necesita manejar cada tipo de excepción; basta con `try { ... } catch (err) { next(err); }`.

---

## 🔐 Seguridad de contraseñas

- En el modelo `Administrativo`, el hook `beforeCreate` y `beforeUpdate` hashea la contraseña con `bcrypt` + salt de 10 rondas.
- La columna `contrasenia` se excluye de todas las consultas que devuelven datos al cliente (servicio usa `attributes: { exclude: ['contrasenia'] }`).
- El método `validarContrasenia` permite comparar una contraseña en texto plano con el hash almacenado.

---

## 🧩 ¿Cómo agregar una nueva entidad (ej. "Materia")?

Sigue estos pasos (copia la estructura de `administrativos`):

1. **Modelo** (`modules/materias/model/Materia.ts`): define columnas, timestamps, hooks, validaciones.
2. **DTO** (`modules/materias/dto/create-materia.dto.ts`, `update-materia.dto.ts`): esquemas Zod para validar entrada.
3. **Servicio** (`modules/materias/service/materia.service.ts`): métodos `getAll`, `getById`, `create`, `update`, `delete`.
4. **Controlador** (`modules/materias/controller/materia.controller.ts`): integra DTO + servicio, maneja HTTP.
5. **Rutas** (`modules/materias/materia.routes.ts`): define endpoints con middlewares correspondientes.
6. **Registrar en `index.ts`**:
   - Importa el modelo y agrega relaciones si las tiene.
   - Exporta el modelo para que esté disponible en otros lugares.
7. **Agregar en `src/index.ts`**:
   ```ts
   import { materiaRouter } from "./modules/materias/materia.routes.js";
   app.use(`${RAIZ}/materias`, materiaRouter);
   ```

---

## 🧪 Pruebas rápidas (ejemplo con cURL)

```bash
# Obtener todos los administrativos (necesita token, pero con el placeholder funciona)
curl -H "Authorization: faketoken" http://localhost:4000/api/v1/administrativos

# Crear un administrativo (ADMIN)
curl -X POST http://localhost:4000/api/v1/administrativos \
  -H "Authorization: faketoken" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Ana","apellido":"López","email":"ana@example.com","dni":"12345678","contrasenia":"secreto123","telefono":"555-1234","domicilio":"Calle Falsa 123","idRol":1}'
```

---

## 📌 Notas finales y recomendaciones

- **Producción**:
  - Cambiar `sequelize.sync({ force: false })` por **migraciones** (evita pérdida de datos).
  - Implementar JWT real con librería `jsonwebtoken`.
  - Usar variables de entorno para `NODE_ENV=production` y desactivar logs detallados.
  - Establecer límites de paginación más estrictos.
- **Extensiones posibles**:
  - Añadir soft delete usando `paranoid: true` en el modelo.
  - Integrar logging con Winston.
  - Documentar la API con Swagger.

Este código fue diseñado para ser **didáctico**, manteniendo un balance entre simplicidad y buenas prácticas. Sirve como base sólida para un sistema real, y cada concepto está justificado para facilitar el aprendizaje y la colaboración en equipo.

## importante:

el middleware JWT es un simulacro
Esto significa que todas tus requests van a pasar como ADMIN siempre que incluyas cualquier header Authorization. El valor no importa, ni siquiera necesita ser un JWT válido.
Para probar en Postman/Insomnia solo necesitás agregar:
**Authorization: cualquiercosa**
Sin ese header, todas las rutas protegidas devolverán 401.

# AppRecordatorio - App de Recordatorios Semanales

Aplicación full-stack para gestionar recordatorios semanales. Permite crear recordatorios con título y día de la semana, listarlos y consultarlos a través de una API REST construida con Spring Boot y un frontend ligero en HTML/CSS/JS.

---

## 📋 Tabla de Contenidos

- [Stack tecnológico](#stack-tecnológico)
- [Requisitos previos](#requisitos-previos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Configuración de la base de datos](#configuración-de-la-base-de-datos)
- [Cómo poner en marcha el backend](#cómo-poner-en-marcha-el-backend)
- [Cómo ejecutar el frontend](#cómo-ejecutar-el-frontend)
- [Endpoints de la API](#endpoints-de-la-api)
- [Ejemplos de uso con Postman](#ejemplos-de-uso-con-postman)
- [Ejemplos de uso con cURL](#ejemplos-de-uso-con-curl)
- [Pruebas directas en la base de datos](#pruebas-directas-en-la-base-de-datos)
- [Solución de problemas](#solución-de-problemas)

---

## 🛠 Stack tecnológico

| Capa | Tecnología | Versión |
|------|------------|---------|
| Backend | Spring Boot | 4.1.1 |
| Lenguaje | Java | 17 |
| Base de datos | MySQL / MariaDB | 8.x |
| ORM | Hibernate / Spring Data JPA | — |
| Frontend | HTML5, CSS3, JavaScript (Vanilla) | — |
| Build tool | Apache Maven | 3.9.x |

---

## 📦 Requisitos previos

Antes de ejecutar la aplicación, asegúrate de tener instalado lo siguiente:

1. **Java Development Kit (JDK) 17 o superior**
   ```bash
   java -version
   ```

2. **Apache Maven** (para compilar y ejecutar el backend)
   ```bash
   mvn -version
   ```

3. **MySQL 8.x o MariaDB** (servidor de base de datos corriendo en `localhost:3306`)
   ```bash
   systemctl status mysql   # o mariadb
   ```

4. **Navegador web** (Chrome, Firefox, Edge, etc.) para el frontend.

5. **Opcional pero recomendado:**
   - [Postman](https://www.postman.com/) para probar los endpoints de la API.
   - [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (extensión de VS Code) para servir el frontend con recarga automática.

---

## 📁 Estructura del proyecto

```
AppRecordatorio/
├── README.md
├── Backend/
│   ├── pom.xml
│   ├── mvnw
│   ├── mvnw.cmd
│   └── src/
│       └── main/java/com/example/reminder/
│           ├── ReminderApplication.java
│           ├── config/CorsConfig.java
│           ├── controller/ReminderController.java
│           ├── dto/ReminderRequest.java
│           ├── entity/Reminder.java
│           ├── repository/ReminderRepository.java
│           └── service/ReminderService.java
│       └── resources/
│           └── application.properties
└── Frontend/
    ├── index.html
    └── src/
        ├── css/style.css
        └── js/app.js
```

---

## 🗄 Configuración de la base de datos

La aplicación usa la base de datos `reminder_db`. La tabla `reminder` se crea automáticamente mediante Hibernate (`ddl-auto=update`) al iniciar el backend.

### Credenciales por defecto (`Backend/src/main/resources/application.properties`)

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/reminder_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

> **Importante:** Si tu contraseña de MySQL/MariaDB es diferente, edita el archivo `application.properties` y reemplaza `root` por tu contraseña real.

### Crear la base de datos manualmente (opcional)

Si la base de datos aún no existe, créala antes de iniciar el backend:

```sql
CREATE DATABASE reminder_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

## 🚀 Cómo poner en marcha el backend

1. Abre una terminal en la carpeta `Backend/`:

   ```bash
   cd Backend
   ```

2. Compila el proyecto:

   ```bash
   mvn compile
   ```

3. Ejecuta la aplicación con Spring Boot:

   ```bash
   mvn spring-boot:run
   ```

   O, si ya compilaste previamente:

   ```bash
   java -jar target/*.jar
   ```

4. Verifica que el servidor esté corriendo en:

   ```
   http://localhost:8080
   ```

   Los logs mostrarán algo como:
   ```
   Tomcat started on port(s): 8080 (http) with context path ''
   Started ReminderApplication in X.XXX seconds
   ```

---

## 💻 Cómo ejecutar el frontend

### Opción A: Abrir directamente en el navegador (más sencillo)

1. Abre el archivo `Frontend/index.html` en tu navegador favorito.
   - Doble clic sobre el archivo, o
   - Arrastra el archivo a la ventana del navegador.

2. El frontend se conectará automáticamente a `http://localhost:8080/api/reminders`.

> ⚠️ Nota: Al abrir el archivo directamente (`file://`), algunos navegadores pueden bloquear peticiones `fetch` por políticas CORS. Si ocurre esto, usa la Opción B.

### Opción B: Con Live Server (VS Code) — Recomendado

1. Instala la extensión **Live Server** en Visual Studio Code.
2. Abre la carpeta `Frontend/` en VS Code.
3. Haz clic derecho sobre `index.html` y selecciona **"Open with Live Server"**.
4. El servidor se levantará en `http://localhost:5500` (puerto por defecto).
5. El frontend consumirá la API del backend en `http://localhost:8080`.

### Opción C: Con cualquier servidor HTTP local

Si tienes Python instalado:

```bash
cd Frontend
python3 -m http.server 5500
```

Luego abre `http://localhost:5500` en el navegador.

---

## 🔌 Endpoints de la API

El backend expone únicamente los métodos **GET** y **POST** bajo la ruta base `/api/reminders`.

### GET `/api/reminders`

Obtiene la lista completa de recordatorios.

**Respuesta (200 OK):**
```json
[
  {
    "id": 3,
    "title": "Subir todas las tareas al curso",
    "dayOfWeek": "MONDAY",
    "createdAt": "2026-10-25T22:02:50.644330"
  }
]
```

### POST `/api/reminders`

Crea un nuevo recordatorio.

**Cuerpo de la solicitud:**
```json
{
  "title": "Ir al gimnasio",
  "dayOfWeek": "MONDAY"
}
```

**Campos:**
| Campo | Tipo | Requerido | Descripción | Valores válidos |
|-------|------|-----------|-------------|-----------------|
| `title` | String | Sí | Título del recordatorio | Máx. 100 caracteres |
| `dayOfWeek` | String | Sí | Día de la semana | `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY` |

**Respuesta (201 Created):**
```json
{
  "id": 4,
  "title": "Ir al gimnasio",
  "dayOfWeek": "MONDAY",
  "createdAt": "2026-10-25T22:05:12.123456"
}
```

---

## 📮 Ejemplos de uso con Postman

### 1. Listar todos los recordatorios (GET)

- **Método:** `GET`
- **URL:** `http://localhost:8080/api/reminders`
- **Headers:** `Content-Type: application/json`
- **Body:** Ninguno

### 2. Crear un recordatorio (POST)

- **Método:** `POST`
- **URL:** `http://localhost:8080/api/reminders`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "title": "Reunión de equipo",
    "dayOfWeek": "WEDNESDAY"
  }
  ```

> 💡 Puedes importar estos endpoints en Postman como una colección para probar más rápido.

---

## 🌐 Ejemplos de uso con cURL

### Listar recordatorios
```bash
curl -X GET http://localhost:8080/api/reminders \
  -H "Content-Type: application/json"
```

### Crear un recordatorio
```bash
curl -X POST http://localhost:8080/api/reminders \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Comprar pan",
    "dayOfWeek": "SATURDAY"
  }'
```

---

## 🗃 Pruebas directas en la base de datos

Puedes consultar la tabla directamente con el cliente de MySQL/MariaDB para verificar que los datos se guardan correctamente.

```bash
# Conectar a la base de datos
mysql -u root -proot reminder_db

# Ver todos los recordatorios
SELECT * FROM reminder;

# Contar cuántos hay
SELECT COUNT(*) AS total FROM reminder;

# Filtrar por día de la semana
SELECT * FROM reminder WHERE day_of_week = 'MONDAY';

# Ver los más recientes
SELECT * FROM reminder ORDER BY created_at DESC;

# Insertar uno manualmente (para probar que el backend lo lee)
INSERT INTO reminder (title, day_of_week) VALUES ('Prueba manual', 'TUESDAY');
```

Esquema de la tabla `reminder`:

| Columna | Tipo | Nulo | Clave | Extra |
|---------|------|------|-------|-------|
| `id` | bigint(20) | NO | PRI | auto_increment |
| `title` | varchar(100) | NO | | |
| `day_of_week` | varchar(10) | NO | | |
| `created_at` | datetime(6) | SÍ | | |

---

## ⚙️ Configuración CORS

El backend incluye una configuración de CORS (`CorsConfig.java`) que permite peticiones desde cualquier origen (`*`) exclusivamente para los métodos **GET** y **POST** en la ruta `/api/**`. Esto permite que el frontend se comunique con el backend incluso si se sirven en puertos diferentes.

---

## 🔍 Solución de problemas

| Problema | Posible causa | Solución |
|----------|---------------|----------|
| `Access denied for user 'root'@'localhost'` | Contraseña incorrecta en `application.properties` | Edita `Backend/src/main/resources/application.properties` y coloca tu contraseña real de MySQL/MariaDB |
| `Table 'reminder_db.reminder' doesn't exist` | La base de datos existe pero la tabla no se creó | Inicia el backend; Hibernate creará la tabla automáticamente con `ddl-auto=update` |
| Error CORS en el navegador | El backend no está corriendo o el puerto es incorrecto | Asegúrate de que el backend esté en `http://localhost:8080` |
| `fetch` falla al abrir `index.html` directamente | Políticas CORS del navegador con `file://` | Usa Live Server o cualquier servidor HTTP local (Opción B o C) |
| El backend no inicia | Puerto 8080 ocupado | Cambia el puerto en `application.properties` agregando `server.port=8081` |

---

## ✅ Flujo de uso rápido

1. Inicia MySQL/MariaDB.
2. Verifica que exista la base de datos `reminder_db`.
3. Edita `application.properties` si tu contraseña no es `root`.
4. Inicia el backend: `cd Backend && mvn spring-boot:run`.
5. Abre el frontend con Live Server o directamente `Frontend/index.html`.
6. Crea recordatorios desde el formulario y visualízalos en la lista.
7. Prueba los endpoints con Postman o cURL si lo deseas.

---

**Desarrollado con Spring Boot + Java 17 + MySQL + HTML/CSS/JS Vanilla.**

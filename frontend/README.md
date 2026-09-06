# WorkBiz

WorkBiz es una plataforma web desarrollada por el equipo Kreatech con el objetivo de conectar pequeños emprendedores de Nicaragua con proveedores y estudiantes que buscan oportunidades de experiencia laboral.

La plataforma permite que cada tipo de usuario acceda a funciones específicas según su rol.

## Roles de usuario

### Emprendedor

El emprendedor puede:

- Buscar proveedores por categoría.
- Ver información de proveedores.
- Enviar solicitudes de conexión.
- Consultar el estado de sus conexiones.
- Ver los datos de contacto cuando una conexión es aceptada.
- Publicar oportunidades para estudiantes.
- Revisar postulaciones recibidas.
- Aceptar o rechazar postulaciones.
- Ver los datos de contacto del estudiante cuando una postulación es aceptada.

### Proveedor

El proveedor puede:

- Administrar su perfil.
- Crear productos o servicios.
- Editar productos.
- Eliminar productos.
- Agregar imágenes a sus productos.
- Revisar solicitudes de conexión.
- Aceptar o rechazar conexiones.
- Ver los datos de contacto del emprendedor cuando la conexión es aceptada.

### Estudiante

El estudiante puede:

- Administrar su perfil.
- Consultar oportunidades disponibles.
- Filtrar oportunidades por carrera.
- Postularse a oportunidades.
- Consultar el estado de sus postulaciones.
- Ver los datos de contacto del emprendedor cuando una postulación es aceptada.

## Funcionalidades principales

- Inicio de sesión y registro por tipo de usuario.
- Perfiles editables.
- Imagen o logo de perfil.
- Catálogo de productos para proveedores.
- Búsqueda de proveedores por categoría.
- Sistema de solicitudes de conexión.
- Publicación de oportunidades.
- Filtro de oportunidades por carrera.
- Sistema de postulaciones.
- Estados de solicitud:
  - Pendiente
  - Aceptada
  - Rechazada
- Visualización de datos de contacto después de una conexión aceptada.
- Diseño adaptable a diferentes tamaños de pantalla.

WorkBiz no cuenta con un sistema de chat interno. Una vez aceptada una conexión o postulación, los usuarios pueden continuar la comunicación mediante correo electrónico o teléfono.

## Tecnologías utilizadas en el frontend

- React
- TypeScript
- Vite
- CSS
- HTML

## Estructura principal

```text
kreatech-frontend/
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── public/
├── package.json
├── vite.config.ts
└── README.md
# Kreatech
Proyecto hecho para HACKATON - Nicaragua 2026!!!

## Descripción general

WorkBiz es una plataforma web desarrollada  para facilitar la interacción entre emprendedores, proveedores y estudiantes.

El sistema permite gestionar información de los usuarios y establecer conexiones entre los diferentes participantes de la plataforma. Su estructura se encuentra dividida en dos componentes principales: un frontend, encargado de la interfaz de usuario, y un backend, encargado de proporcionar los servicios y gestionar la información del sistema.

La plataforma contempla diferentes tipos de usuarios, entre ellos emprendedores, proveedores y estudiantes, con funcionalidades asociadas a cada perfil.

## Tecnologías utilizadas

### Frontend

El frontend del sistema fue desarrollado utilizando las siguientes tecnologías:

- React 19: biblioteca utilizada para el desarrollo de la interfaz de usuario.
- TypeScript: lenguaje utilizado para el desarrollo del código del frontend.
- Vite: herramienta utilizada para el entorno de desarrollo y compilación del proyecto.
- HTML y CSS: utilizados para la estructura y presentación de la interfaz.

### Backend

El backend fue desarrollado utilizando:

- C#: lenguaje utilizado para el desarrollo de la aplicación.
- .NET 10: plataforma utilizada para la implementación del backend.
- ASP.NET Core: framework utilizado para el desarrollo de los servicios web.
- Entity Framework Core: herramienta utilizada para la interacción con la base de datos.
- SQLite: sistema de gestión de base de datos utilizado por la aplicación.
- OpenAPI: utilizado para la documentación de los servicios de la API.
- Scalar: herramienta utilizada para la visualización y consulta de la documentación de la API.

## Instalación básica

Para ejecutar el proyecto es necesario contar con Node.js y npm para el frontend, así como con el SDK de .NET 10 para el backend.

### Clonar el repositorio

```bash
git clone https://github.com/KeenCleo/Kreatech.git
cd Kreatech

Instalación del frontend

Ingresar al directorio del frontend e instalar las dependencias del proyecto:

cd frontend
npm install

Instalación del backend

Ingresar al directorio del backend y restaurar las dependencias:

cd ../backend/Workbiz.Api
dotnet restore

Ejecución del sistema

Backend

Para iniciar el servidor backend, ejecutar desde el directorio backend/Workbiz.Api:

dotnet run

El comando inicia la aplicación desarrollada con ASP.NET Core y permite ejecutar los servicios definidos en el backend.

Frontend

Para iniciar el frontend, abrir una nueva terminal, ingresar al directorio frontend y ejecutar:

npm run dev

Vite iniciará el servidor de desarrollo y proporcionará en la terminal la dirección local para acceder a la aplicación.

Compilación del frontend

Para generar una versión compilada del frontend, ejecutar:

npm run build

Este comando genera la compilación del proyecto utilizando Vite.
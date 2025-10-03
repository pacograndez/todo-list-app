# Todo List App

Esta es una aplicación de lista de tareas (Single Page Application - SPA) construida con Angular. Permite a los usuarios registrarse/iniciar sesión para gestionar sus tareas personales a través de una interfaz limpia y reactiva.

## Características

*   Autenticación de usuarios.
*   Crear, leer, actualizar y eliminar (CRUD) tareas.
*   Interfaz de usuario moderna y responsiva.
*   Notificaciones para las acciones del usuario.
*   Código limpio y mantenible con chequeo de estilo y formato.

## 🏛️ Arquitectura

La arquitectura de este proyecto está diseñada para ser modular, mantenible y reactiva, siguiendo las mejores prácticas de Angular.

*   **Arquitectura Modular por Features:** El código está organizado en módulos de negocio (`Auth`, `Tasks`), lo que permite una clara separación de responsabilidades y facilita la escalabilidad.

*   **Gestión de Estado Reactiva (Patrón Facade):** Se utiliza un patrón de estado avanzado para cada feature.
    *   Un **Servicio de Estado** (ej. `TasksStateService`) actúa como "fachada" y única fuente de verdad (`Single Source of Truth`). Contiene el estado reactivo (usando `Signals`) y orquesta la lógica de negocio.
    *   Un **Servicio de API** (ej. `TasksService`) tiene la única responsabilidad de comunicarse con el backend.
    *   Los **Componentes** son simples y solo interactúan con el Servicio de Estado, haciendo que la UI sea un reflejo del estado de la aplicación.

*   **Enrutamiento Declarativo:** El sistema de rutas utiliza guardianes (`guards`) especializados y agnósticos para proteger las rutas públicas y privadas, resultando en una configuración de enrutamiento limpia y fácil de entender.

---

## 🚀 Instrucciones de Instalación

Para levantar este proyecto en tu entorno local, por favor sigue estos pasos:

1.  **Clonar el repositorio**
    ```sh
    git clone <URL_DEL_REPOSITORIO_AQUI>
    ```

2.  **Navegar al directorio del proyecto**
    ```sh
    cd todo-list-app
    ```

3.  **Instalar dependencias**
    Este proyecto usa `npm` como gestor de paquetes. Ejecuta el siguiente comando para instalar todas las dependencias necesarias.
    ```sh
    npm install
    ```

---

## 🏃‍♂️ Instrucciones de Ejecución

Una vez que las dependencias estén instaladas, puedes iniciar el servidor de desarrollo de Angular.

1.  **Iniciar el servidor**
    ```sh
    npm run start
    ```
    También puedes usar el comando de Angular CLI directamente: `ng serve`.

2.  **Abrir en el navegador**
    Abre tu navegador y visita `http://localhost:4200/`. La aplicación se recargará automáticamente si realizas cambios en los archivos fuente.

### Otros Comandos Útiles

*   **Formatear el código:** Para asegurar un estilo de código consistente, puedes usar Prettier.
    ```sh
    npm run format
    ```

*   **Analizar el código (Linting):** Para encontrar problemas de calidad en el código, puedes usar ESLint.
    ```sh
    npm run lint
    ```

---

## 🛠️ Tecnologías y Herramientas Utilizadas

Este proyecto fue construido utilizando tecnologías modernas para el desarrollo web.

### Framework y Librerías Principales
*   **[Angular (~19.2.0)](https://angular.io/):** El framework principal para construir la aplicación.
*   **[TypeScript (~5.7.2)](https://www.typescriptlang.org/):** El lenguaje de programación principal.
*   **[RxJS (~7.8.0)](https://rxjs.dev/):** Para la programación reactiva y el manejo de operaciones asíncronas.
*   **[Angular Signals](https://angular.io/guide/signals):** Para la gestión de estado reactivo dentro de los componentes y servicios.

### UI y Estilos
*   **[Bootstrap (~5.3.8)](https://getbootstrap.com/):** Para el diseño y los componentes de la interfaz de usuario.
*   **[ng-bootstrap (~18.0.0)](https://ng-bootstrap.github.io/):** Directivas de Angular para los componentes de Bootstrap.
*   **[Bootstrap Icons (~1.13.1)](https://icons.getbootstrap.com/):** Para los íconos utilizados en la aplicación.
*   **[SCSS](https://sass-lang.com/):** Preprocesador de CSS para un estilizado más avanzado.
*   **[ngx-toastr (~19.1.0)](https://www.npmjs.com/package/ngx-toastr):** Para mostrar notificaciones (toasts) al usuario.

### Calidad de Código y Herramientas
*   **[Angular CLI](https://angular.io/cli):** Para la generación de código, compilación y otras tareas de desarrollo.
*   **[ESLint](https://eslint.org/):** Para el análisis estático del código y la detección de problemas.
*   **[Prettier](https://prettier.io/):** Para un formateo de código opinionado y consistente.
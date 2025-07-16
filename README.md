# Centro de Gobierno de Datos (DAMA-DMBOK)

Este proyecto es una aplicación web interactiva diseñada como un dashboard educativo y funcional para gestionar los principales dominios del Gobierno de Datos, basándose en el marco de referencia DAMA-DMBOK 2.

**URL del Proyecto (GitHub Pages):** `https://[tu-usuario].github.io/[tu-repositorio]/`

## Descripción

La aplicación proporciona una interfaz limpia y organizada con una barra lateral de navegación que permite acceder a diez módulos temáticos. Cada módulo corresponde a un área de conocimiento clave del Gobierno de Datos y presenta un formulario interactivo para que los usuarios puedan registrar, gestionar y simular información relevante.

El objetivo principal es ofrecer una herramienta práctica para que profesionales y estudiantes puedan aprender, experimentar y aplicar los conceptos de DAMA-DMBOK en un entorno simulado.

## Características Principales

- **Dashboard Modular:** Navegación sencilla a través de 10 dominios de Gobierno de Datos.
- **Formularios Interactivos:** Campos específicos para cada módulo con tooltips explicativos.
- **Persistencia de Datos:** El progreso se guarda localmente en el navegador usando `localStorage`, permitiendo continuar el trabajo en cualquier momento.
- **Exportación de Datos:** Exporta la información de cada módulo a formatos **Excel (.xlsx)** y **PDF**.
- **Diseño Responsivo:** Interfaz limpia y adaptable a diferentes tamaños de pantalla.
- **Cero Dependencias Externas (Producción):** Funciona directamente en el navegador sin necesidad de un backend o un proceso de build.
- **Arquitectura MVC (Frontend):** El código está estructurado siguiendo un patrón Modelo-Vista-Controlador para facilitar su escalabilidad y mantenimiento.

## Módulos Incluidos

1.  **Glosario y Diccionario de Datos:** Para definir y estandarizar términos de negocio y técnicos.
2.  **Laboratorio de Calidad de Datos:** Para simular la creación y aplicación de reglas de calidad.
3.  **Seguridad y Perfilamiento de Accesos:** Para gestionar roles y permisos sobre los datos.
4.  **Arquitectura de Datos Empresarial:** Para documentar sistemas y flujos de datos.
5.  **Simulador de Roles y Gobierno:** Para definir responsabilidades de los roles de gobierno (Steward, Owner, etc.).
6.  **Catálogo y Lineaje de Datos:** Para registrar activos de datos y trazar su origen y destino.
7.  **KPIs y Métricas de Gobierno:** Para definir indicadores clave de rendimiento del programa de gobierno.
8.  **Workflow de Cambios Críticos:** Para simular el proceso de gestión de cambios que impactan los datos.
9.  **Evaluación de Madurez:** Para autoevaluar el nivel de madurez en cada dominio.
10. **Simulador de Migración de Datos:** Para planificar y documentar proyectos de migración.

## Guía de Uso

1.  **Navegar:** Utiliza la barra lateral izquierda para seleccionar el módulo en el que deseas trabajar.
2.  **Rellenar Información:** Completa los campos del formulario. Pasa el cursor sobre el ícono `?` para ver una breve explicación de cada campo.
3.  **Guardar Progreso:** Haz clic en el botón **Guardar** para almacenar la información en tu navegador. Si cierras o recargas la página, tus datos permanecerán cargados en el formulario.
4.  **Limpiar Formulario:** Usa el botón **Limpiar** para borrar todos los datos del módulo actual.
5.  **Exportar:**
    - Haz clic en **Exportar a Excel** para descargar un archivo `.xlsx` con los datos del módulo.
    - Haz clic en **Exportar a PDF** para generar un documento `.pdf` con la información.

## Instalación y Despliegue en GitHub Pages

Este proyecto está diseñado para ser desplegado fácilmente como un sitio estático en GitHub Pages.

**Pasos:**

1.  **Fork o Clonar el Repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2.  **Subir a tu Repositorio de GitHub:**
    - Si lo clonaste, asegúrate de tenerlo en tu propia cuenta de GitHub.
    - Si hiciste un fork, ya está en tu cuenta.

3.  **Activar GitHub Pages:**
    - Ve a la pestaña **Settings** (Configuración) de tu repositorio en GitHub.
    - En el menú de la izquierda, selecciona **Pages**.
    - En la sección "Build and deployment", bajo "Source", selecciona **Deploy from a branch**.
    - Elige la rama `main` (o `master`) y la carpeta `/ (root)`.
    - Haz clic en **Save**.

4.  **Acceder a tu Sitio:**
    - GitHub te proporcionará una URL (ej. `https://tu-usuario.github.io/tu-repositorio/`).
    - El sitio estará disponible en esa dirección en unos minutos.

## Posibles Mejoras a Futuro

- [ ] **Validación Avanzada:** Implementar validaciones más robustas en los formularios (ej. formatos de email, números, etc.).
- [ ] **Relaciones entre Módulos:** Crear conexiones entre los datos de diferentes módulos (ej. seleccionar un término del glosario en el módulo de calidad).
- [ ] **Visualizaciones Gráficas:** Añadir gráficos para los KPIs o diagramas para los flujos de datos usando librerías como `Chart.js` o `D3.js`.
- [ ] **Frameworks Modernos:** Migrar la aplicación a un framework como **React** o **Vue.js** para una mejor gestión del estado y componentización.
- [ ] **Backend y Base de Datos:** Añadir un backend (ej. Node.js, Python) y una base de datos (ej. PostgreSQL, MongoDB) para permitir el guardado centralizado y la colaboración entre usuarios.
- [ ] **Autenticación de Usuarios:** Implementar un sistema de login para que cada usuario gestione su propio dashboard.
- [ ] **Importación de Datos:** Permitir la importación de datos desde archivos Excel para pre-rellenar los formularios.
- [ ] **Internacionalización (i18n):** Añadir soporte para múltiples idiomas.

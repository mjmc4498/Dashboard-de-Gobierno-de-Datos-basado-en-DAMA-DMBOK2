# Centro de Gobierno de Datos (DAMA-DMBOK)

Este proyecto es una aplicación web interactiva diseñada como un dashboard educativo y funcional para gestionar los principales dominios del Gobierno de Datos, basándose en el marco de referencia DAMA-DMBOK 2.

**URL del Proyecto (GitHub Pages):** `https://[tu-usuario].github.io/[tu-repositorio]/`

## Descripción

La aplicación proporciona una interfaz limpia y organizada con una barra de navegación que permite acceder a diez módulos temáticos. Cada módulo corresponde a un área de conocimiento clave del Gobierno de Datos y presenta un formulario interactivo para que los usuarios puedan registrar, gestionar y simular información relevante.

El objetivo principal es ofrecer una herramienta práctica para que profesionales y estudiantes puedan aprender, experimentar y aplicar los conceptos de DAMA-DMBOK en un entorno simulado.

## Características Principales

- **Dashboard Modular:** Navegación sencilla a través de 10 dominios de Gobierno de Datos.
- **Formularios Interactivos:** Campos específicos para cada módulo con tooltips explicativos.
- **Persistencia de Datos:** El progreso se guarda localmente en el navegador usando `localStorage`, permitiendo continuar el trabajo en cualquier momento.
- **Exportación de Datos:** Exporta la información de cada módulo a formatos **Excel (.xlsx)** y **PDF**.
- **Diseño Responsivo:** Interfaz limpia y adaptable a diferentes tamaños de pantalla.
- **Cero Dependencias Externas (Producción):** Funciona directamente en el navegador sin necesidad de un backend o un proceso de build.
- **Arquitectura MVC (Frontend):** El código está estructurado siguiendo un patrón Modelo-Vista-Controlador para facilitar su escalabilidad y mantenimiento.
- **Gestión de Registros (CRUD):** Permite añadir, editar y eliminar registros en cada módulo.
- **Importación desde Excel:** Carga masiva de registros desde archivos `.xlsx`.

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

1.  **Navegar:** Utiliza el menú "Módulos" en la barra superior para seleccionar el área de trabajo.
2.  **Añadir un Registro:** Completa el formulario y haz clic en **Añadir Registro**. Los datos aparecerán en la tabla de "Registros Guardados".
3.  **Editar un Registro:** Haz clic en el botón **Editar** de cualquier fila. Los datos se cargarán en el formulario. Modifícalos y vuelve a hacer clic en el botón (que ahora funcionará como "Actualizar").
4.  **Eliminar un Registro:** Haz clic en el botón **Eliminar** de la fila que deseas quitar.
5.  **Importar desde Excel:** Haz clic en **Importar desde Excel** y selecciona tu archivo `.xlsx`. Asegúrate de que el archivo sigue el formato correcto (ver guía de importación más abajo).
6.  **Exportar:** Usa los botones de **Exportar a Excel** o **Exportar a PDF** para descargar todos los registros de la tabla del módulo actual.

---

## Guía de Importación desde Excel

La funcionalidad de "Importar desde Excel" permite cargar múltiples registros a un módulo de forma masiva. Para que la importación funcione correctamente, el archivo `.xlsx` debe seguir un formato específico.

**Requisitos del Archivo Excel:**

1.  **La primera fila debe ser el encabezado.**
2.  **Los nombres de las columnas en el encabezado deben coincidir exactamente con los identificadores (`name`) de los campos del módulo.**

Estos identificadores son sensibles a mayúsculas y minúsculas. A continuación se muestra una tabla de referencia para los campos de cada módulo.

**Ejemplo para el módulo "Glosario y Diccionario de Datos":**

El archivo `importacion_glosario.xlsx` debería verse así:

| term | definition | format | source |
| :--- | :--- | :--- | :--- |
| KPI | Key Performance Indicator | VARCHAR(255) | Business Intelligence |
| Cliente Activo | Cliente que ha realizado una compra en los últimos 6 meses. | BOOLEAN | CRM |

**Referencia de Campos por Módulo:**

| Módulo | Campos (`name`) |
| :--- | :--- |
| **Glosario y Diccionario de Datos** | `term`, `definition`, `format`, `source` |
| **Laboratorio de Calidad de Datos** | `ruleName`, `description`, `dimension`, `query` |
| **Seguridad y Perfilamiento de Accesos** | `role`, `dataDomain`, `permissions`, `justification` |
| **Arquitectura de Datos Empresarial** | `systemName`, `dataFlow`, `dataModel` |
| **Simulador de Roles y Gobierno** | `roleDAMA`, `responsibilities`, `relatedProcesses` |
| **Catálogo y Lineaje de Datos** | `dataAsset`, `lineage`, `owner` |
| **KPIs y Métricas de Gobierno** | `kpiName`, `kpiFormula`, `goal`, `frequency` |
| **Workflow de Cambios Críticos** | `changeRequest`, `impact`, `approvers`, `status` |
| **Evaluación de Madurez** | `domain`, `currentLevel`, `targetLevel`, `initiatives` |
| **Simulador de Migración de Datos** | `sourceSystem`, `targetSystem`, `mapping`, `validationPlan` |

---

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
- [ ] **Backend y Base de Datos:** Añadir un backend (ej. Node.js, Python) y una base de datos (ej. PostgreSQL, MongoDB) para permitir el guardado centralizado y la colaboración entre usuarios.
- [ ] **Autenticación de Usuarios:** Implementar un sistema de login para que cada usuario gestione su propio dashboard.
- [ ] **Internacionalización (i18n):** Añadir soporte para múltiples idiomas.

# Centro de Gobierno de Datos (DAMA-DMBOK)

Este proyecto es una aplicación web interactiva diseñada como un dashboard educativo y funcional para gestionar y visualizar los principales dominios del Gobierno de Datos, basándose en el marco de referencia DAMA-DMBOK 2.

**URL del Proyecto (GitHub Pages):** `https://[tu-usuario].github.io/[tu-repositorio]/`

## Descripción

La aplicación proporciona una interfaz limpia y profesional, construida con Bootstrap 5, que permite una fácil navegación a través de diez dominios temáticos de Gobierno de Datos y un dashboard de indicadores consolidado. Cada módulo presenta un formulario interactivo para registrar, editar, eliminar y gestionar información relevante, la cual se guarda localmente en el navegador.

El objetivo principal es ofrecer una herramienta práctica y visualmente atractiva para que profesionales y estudiantes puedan aprender, experimentar y aplicar los conceptos de DAMA-DMBOK en un entorno simulado.

## Características Principales

- **Dashboard de Indicadores:** Una vista gerencial que resume el estado del gobierno de datos con métricas clave.
- **10 Módulos Temáticos:** Cubre las áreas de conocimiento principales de DAMA-DMBOK.
- **Gestión Completa (CRUD):** Permite añadir, editar y eliminar registros en cada módulo.
- **Persistencia de Datos:** El progreso se guarda localmente en el navegador usando `localStorage`.
- **Importación y Exportación:** Carga masiva de datos desde **Excel (.xlsx)** y exportación a **Excel** y **PDF**.
- **UI/UX Moderna:** Interfaz responsiva y profesional gracias a la integración con **Bootstrap 5**.
- **Arquitectura MVC (Frontend):** Código estructurado para facilitar su escalabilidad y mantenimiento.

## Módulos y Dashboard

La aplicación se organiza en las siguientes secciones, accesibles desde el menú "Módulos":

1.  **Dashboard de Indicadores:** Muestra un resumen visual del estado de los datos.
2.  **Glosario y Diccionario de Datos:** Para definir y estandarizar términos.
3.  **Laboratorio de Calidad de Datos:** Para simular la creación de reglas de calidad.
4.  **Seguridad y Perfilamiento de Accesos:** Para gestionar roles y permisos.
5.  **Arquitectura de Datos Empresarial:** Para documentar sistemas y flujos.
6.  **Simulador de Roles y Gobierno:** Para definir responsabilidades de roles DAMA.
7.  **Catálogo y Lineaje de Datos:** Para registrar y trazar activos de datos.
8.  **KPIs y Métricas de Gobierno:** Para definir indicadores de rendimiento.
9.  **Workflow de Cambios Críticos:** Para simular la gestión de cambios.
10. **Evaluación de Madurez:** Para autoevaluar el nivel de madurez.
11. **Simulador de Migración de Datos:** Para planificar proyectos de migración.

## Manual de Uso

### 1. Navegación
Utiliza el menú **"Módulos"** en la barra de navegación superior para seleccionar el área de trabajo o para acceder al **Dashboard de Indicadores**.

### 2. Dashboard de Indicadores
Esta es la primera vista que resume la información clave de los otros módulos. Muestra:
- **Términos en Glosario:** Número total de términos definidos.
- **Reglas de Calidad:** Cantidad total de reglas de calidad creadas.
- **Madurez Promedio:** El nivel de madurez promedio calculado a partir de las autoevaluaciones.

### 3. Gestión de Registros (En Módulos de Formularios)
- **Añadir un Registro:** Completa el formulario y haz clic en **Añadir Registro**. Los datos aparecerán en la tabla inferior.
- **Editar un Registro:** Haz clic en el botón **Editar** de cualquier fila. Los datos se cargarán en el formulario. Modifícalos y el botón "Añadir Registro" funcionará como "Actualizar" al guardarlo.
- **Eliminar un Registro:** Haz clic en el botón **Eliminar** de la fila que deseas quitar. Se pedirá confirmación.

### 4. Importación y Exportación
- **Importar:** Haz clic en **Importar desde Excel** y selecciona tu archivo `.xlsx`. Asegúrate de que el archivo sigue el formato correcto (ver guía de importación más abajo).
- **Exportar:** Usa los botones de **Exportar a Excel** o **Exportar a PDF** para descargar todos los registros de la tabla del módulo actual.

---

## Guía de Importación desde Excel

Para que la importación funcione, la **primera fila** de tu archivo Excel debe contener los **nombres exactos de los campos (`name`)** del módulo correspondiente. Estos nombres son sensibles a mayúsculas y minúsculas.

**Ejemplo para "Glosario y Diccionario de Datos":**

| term | definition | format | source |
| :--- | :--- | :--- | :--- |
| KPI | Key Performance Indicator | VARCHAR(255) | Business Intelligence |
| Cliente Activo | Cliente que ha realizado una compra en los últimos 6 meses. | BOOLEAN | CRM |

**Referencia Rápida de Campos por Módulo:**

| Módulo | Campos (`name`) |
| :--- | :--- |
| **Glosario...** | `term`, `definition`, `format`, `source` |
| **Calidad de Datos...** | `ruleName`, `description`, `dimension`, `query` |
| **Seguridad...** | `role`, `dataDomain`, `permissions`, `justification` |
| *... (y así sucesivamente para los demás módulos)* |

---

## Instalación y Despliegue

El proyecto es un sitio estático que no requiere un proceso de build. Puede ser desplegado fácilmente en cualquier hosting de sitios estáticos como GitHub Pages.

1.  **Clona o descarga** el repositorio.
2.  **Sube los archivos** a tu hosting.
3.  **Para GitHub Pages:**
    - Ve a `Settings > Pages` en tu repositorio.
    - Selecciona `Deploy from a branch`.
    - Elige la rama `main` y la carpeta `/(root)` y guarda. El sitio estará disponible en la URL proporcionada.

## Posibles Mejoras a Futuro

- [ ] **Gráficos Avanzados:** Usar una librería como `Chart.js` para mejorar el dashboard.
- [ ] **Validación de Formularios:** Implementar validación más robusta del lado del cliente.
- [ ] **Backend y Base de Datos:** Añadir un backend para guardado centralizado y colaboración.
- [ ] **Autenticación de Usuarios:** Permitir que múltiples usuarios gestionen sus propios dashboards.
- [ ] **Internacionalización (i18n):** Añadir soporte para múltiples idiomas.

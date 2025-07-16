const model = {
    modules: {
        gdd: {
            title: 'Glosario y Diccionario de Datos',
            fields: [
                { name: 'term', label: 'Término', type: 'text', required: true, tooltip: 'Nombre del dato o concepto.' },
                { name: 'definition', label: 'Definición de Negocio', type: 'textarea', required: true, tooltip: 'Descripción clara y sin ambigüedades.' },
                { name: 'format', label: 'Formato Técnico', type: 'text', tooltip: 'Ej. VARCHAR(50), INTEGER, DATE.' },
                { name: 'source', label: 'Fuente de Origen', type: 'text', tooltip: 'Sistema o proceso donde se origina el dato.' }
            ]
        },
        lcd: {
            title: 'Laboratorio de Calidad de Datos',
            fields: [
                { name: 'ruleName', label: 'Nombre de la Regla', type: 'text', required: true, tooltip: 'Identificador único para la regla de calidad.' },
                { name: 'description', label: 'Descripción', type: 'textarea', tooltip: 'Explicación de lo que valida la regla.' },
                { name: 'dimension', label: 'Dimensión de Calidad', type: 'select', options: ['Completitud', 'Exactitud', 'Consistencia', 'Unicidad', 'Validez'], tooltip: 'Categoría de la regla según DAMA.' },
                { name: 'query', label: 'Simulación de Regla (SQL)', type: 'textarea', tooltip: 'Ej. SELECT COUNT(*) FROM tabla WHERE campo IS NULL;' }
            ]
        },
        spa: {
            title: 'Seguridad y Perfilamiento de Accesos',
            fields: [
                { name: 'role', label: 'Nombre del Rol', type: 'text', required: true, tooltip: 'Ej. Analista de Negocio, Científico de Datos.' },
                { name: 'dataDomain', label: 'Dominio de Datos', type: 'text', tooltip: 'Conjunto de datos al que accede (Ej. Clientes, Ventas).' },
                { name: 'permissions', label: 'Permisos', type: 'select', options: ['Lectura', 'Escritura', 'Actualización', 'Eliminación'], tooltip: 'Nivel de acceso concedido.' },
                { name: 'justification', label: 'Justificación', type: 'textarea', tooltip: 'Motivo por el cual se otorga el acceso.' }
            ]
        },
        ade: {
            title: 'Arquitectura de Datos Empresarial',
            fields: [
                { name: 'systemName', label: 'Nombre del Sistema', type: 'text', required: true },
                { name: 'dataFlow', label: 'Flujo de Datos (Simulado)', type: 'textarea', tooltip: 'Describa o pegue un diagrama simple del flujo de datos (ej. Sistema A -> API -> Sistema B).' },
                { name: 'dataModel', label: 'Modelo de Datos (Simulado)', type: 'textarea', tooltip: 'Estructura o esquema de los datos (ej. JSON, XML, DDL).' }
            ]
        },
        srg: {
            title: 'Simulador de Roles y Gobierno',
            fields: [
                { name: 'roleDAMA', label: 'Rol de Gobierno (DAMA)', type: 'select', options: ['Data Steward', 'Data Owner', 'Data Custodian', 'Chief Data Officer'], required: true },
                { name: 'responsibilities', label: 'Responsabilidades Clave', type: 'textarea', tooltip: 'Principales tareas y deberes del rol.' },
                { name: 'relatedProcesses', label: 'Procesos Relacionados', type: 'text', tooltip: 'Procesos de negocio en los que participa el rol.' }
            ]
        },
        cld: {
            title: 'Catálogo y Lineaje de Datos',
            fields: [
                { name: 'dataAsset', label: 'Activo de Datos', type: 'text', required: true, tooltip: 'Nombre del conjunto de datos, reporte o tabla.' },
                { name: 'lineage', label: 'Lineaje (Simulado)', type: 'textarea', tooltip: 'Origen, transformaciones y destino del dato. Ej. CRM -> ETL -> Data Warehouse -> Reporte Ventas.' },
                { name: 'owner', label: 'Propietario (Owner)', type: 'text', tooltip: 'Persona o rol responsable del activo.' }
            ]
        },
        kmg: {
            title: 'KPIs y Métricas de Gobierno',
            fields: [
                { name: 'kpiName', label: 'Nombre del KPI', type: 'text', required: true },
                { name: 'kpiFormula', label: 'Fórmula de Cálculo', type: 'text', tooltip: 'Ej. (Datos Completos / Total de Datos) * 100.' },
                { name: 'goal', label: 'Meta', type: 'text', tooltip: 'Valor objetivo para el KPI (ej. >95%).' },
                { name: 'frequency', label: 'Frecuencia de Medición', type: 'select', options: ['Diaria', 'Semanal', 'Mensual', 'Trimestral'] }
            ]
        },
        wcc: {
            title: 'Workflow de Cambios Críticos',
            fields: [
                { name: 'changeRequest', label: 'Solicitud de Cambio', type: 'text', required: true, tooltip: 'Descripción breve del cambio solicitado.' },
                { name: 'impact', label: 'Análisis de Impacto', type: 'textarea', tooltip: 'Sistemas, procesos y reportes afectados.' },
                { name: 'approvers', label: 'Aprobadores Requeridos', type: 'text', tooltip: 'Roles que deben aprobar el cambio (ej. Data Owner, IT Lead).' },
                { name: 'status', label: 'Estado', type: 'select', options: ['Solicitado', 'En Aprobación', 'Aprobado', 'Rechazado', 'Implementado'] }
            ]
        },
        em: {
            title: 'Evaluación de Madurez',
            fields: [
                { name: 'domain', label: 'Dominio DAMA Evaluado', type: 'select', options: ['Glosario', 'Calidad', 'Seguridad', 'Arquitectura', 'Roles', 'Catálogo', 'KPIs', 'Workflow', 'Migración'] },
                { name: 'currentLevel', label: 'Nivel de Madurez Actual (1-5)', type: 'number', min: 1, max: 5, required: true, tooltip: '1: Inicial, 5: Optimizado.' },
                { name: 'targetLevel', label: 'Nivel de Madurez Objetivo (1-5)', type: 'number', min: 1, max: 5, tooltip: 'Nivel deseado a alcanzar.' },
                { name: 'initiatives', label: 'Iniciativas de Mejora', type: 'textarea', tooltip: 'Acciones para alcanzar el nivel objetivo.' }
            ]
        },
        smd: {
            title: 'Simulador de Migración de Datos',
            fields: [
                { name: 'sourceSystem', label: 'Sistema Origen', type: 'text', required: true },
                { name: 'targetSystem', label: 'Sistema Destino', type: 'text', required: true },
                { name: 'mapping', label: 'Mapeo de Datos (Simulado)', type: 'textarea', tooltip: 'Reglas de correspondencia entre campos. Ej. origen.nombre_cliente -> destino.customer_name.' },
                { name: 'validationPlan', label: 'Plan de Validación Post-Migración', type: 'textarea', tooltip: 'Estrategia para verificar que los datos se migraron correctamente.' }
            ]
        }
    },

    getModule(key) {
        return this.modules[key];
    },

    saveData(moduleKey, data) {
        localStorage.setItem(moduleKey, JSON.stringify(data));
    },

    loadData(moduleKey) {
        const savedData = localStorage.getItem(moduleKey);
        return savedData ? JSON.parse(savedData) : null;
    },

    clearData(moduleKey) {
        localStorage.removeItem(moduleKey);
    }
};

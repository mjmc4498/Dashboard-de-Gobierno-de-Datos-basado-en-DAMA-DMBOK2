document.addEventListener('DOMContentLoaded', () => {
    const modules = {
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
    };

    const appContainer = document.getElementById('app');
    const menuLinks = document.querySelectorAll('.menu a');

    const renderModule = (moduleKey) => {
        const module = modules[moduleKey];
        if (!module) return;

        let formHtml = `<h2>${module.title}</h2>`;
        module.fields.forEach(field => {
            formHtml += `
                <div class="form-group">
                    <label for="${field.name}">${field.label} ${field.required ? '*' : ''}</label>
                    ${field.type === 'textarea' ?
                        `<textarea id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}></textarea>` :
                    field.type === 'select' ?
                        `<select id="${field.name}" name="${field.name}">
                            ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                        </select>` :
                        `<input type="${field.type}" id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>`
                    }
                    ${field.tooltip ? `<span class="tooltip">? <span class="tooltiptext">${field.tooltip}</span></span>` : ''}
                </div>
            `;
        });

        formHtml += `
            <div class="buttons">
                <button class="btn btn-primary btn-save">Guardar</button>
                <button class="btn btn-secondary btn-clear">Limpiar</button>
                <button class="btn btn-export btn-excel">Exportar a Excel</button>
                <button class="btn btn-export btn-pdf">Exportar a PDF</button>
            </div>
        `;

        appContainer.innerHTML = formHtml;
        loadModuleData(moduleKey);

        appContainer.querySelector('.btn-save').addEventListener('click', () => saveModuleData(moduleKey));
        appContainer.querySelector('.btn-clear').addEventListener('click', () => clearModuleData(moduleKey));
        appContainer.querySelector('.btn-excel').addEventListener('click', () => exportToExcel(moduleKey));
        appContainer.querySelector('.btn-pdf').addEventListener('click', () => exportToPdf(moduleKey));
    };

    const exportToExcel = (moduleKey) => {
        const module = modules[moduleKey];
        const data = module.fields.map(field => {
            const input = document.getElementById(field.name);
            return {
                'Campo': field.label,
                'Valor': input.value
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, module.title);
        XLSX.writeFile(workbook, `${module.title}.xlsx`);
    };

    const exportToPdf = (moduleKey) => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const module = modules[moduleKey];

        doc.setFontSize(18);
        doc.text(module.title, 14, 22);
        doc.setFontSize(11);
        let y = 30;

        modules[moduleKey].fields.forEach(field => {
            const input = document.getElementById(field.name);
            doc.text(`${field.label}:`, 14, y);
            doc.text(input.value, 14, y + 6, { maxWidth: 180 });
            y += 20;
        });

        doc.save(`${module.title}.pdf`);
    };

    const saveModuleData = (moduleKey) => {
        const data = {};
        modules[moduleKey].fields.forEach(field => {
            const input = document.getElementById(field.name);
            data[field.name] = input.value;
        });
        localStorage.setItem(moduleKey, JSON.stringify(data));
        alert('¡Progreso guardado localmente!');
    };

    const loadModuleData = (moduleKey) => {
        const savedData = localStorage.getItem(moduleKey);
        if (savedData) {
            const data = JSON.parse(savedData);
            modules[moduleKey].fields.forEach(field => {
                const input = document.getElementById(field.name);
                if (input && data[field.name]) {
                    input.value = data[field.name];
                }
            });
        }
    };

    const clearModuleData = (moduleKey) => {
        modules[moduleKey].fields.forEach(field => {
            const input = document.getElementById(field.name);
            if (input) {
                input.value = '';
            }
        });
        localStorage.removeItem(moduleKey);
        alert('Formulario limpiado.');
    };

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const moduleKey = e.target.dataset.module;

            menuLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');

            renderModule(moduleKey);
        });
    });

    // Cargar el primer módulo por defecto
    if (menuLinks.length > 0) {
        menuLinks[0].click();
    }
});

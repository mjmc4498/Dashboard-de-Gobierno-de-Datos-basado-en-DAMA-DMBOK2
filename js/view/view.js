const view = {
    appContainer: document.getElementById('app'),
    recordsTable: document.getElementById('records-table'),
    recordsContainer: document.getElementById('records-container'),
    modalContainer: document.getElementById('modal-container'),
    menuLinks: document.querySelectorAll('.dropdown-item'),

    renderDashboard(indicators) {
        this.appContainer.innerHTML = `
            <h2>${indicators.title}</h2>
            <div class="row">
                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="card text-center h-100">
                        <div class="card-body">
                            <h5 class="card-title">Términos en Glosario</h5>
                            <p class="card-text fs-1">${indicators.glossaryCount}</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="card text-center h-100">
                        <div class="card-body">
                            <h5 class="card-title">Reglas de Calidad</h5>
                            <p class="card-text fs-1">${indicators.qualityRulesCount}</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="card text-center h-100">
                        <div class="card-body">
                            <h5 class="card-title">Roles de Gobierno</h5>
                            <p class="card-text fs-1">${indicators.rolesCount}</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="card text-center h-100">
                        <div class="card-body">
                            <h5 class="card-title">Madurez Promedio</h5>
                            <p class="card-text fs-1">${indicators.avgMaturity.toFixed(1)} / 5</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Distribución de Dimensiones de Calidad</h5>
                            <canvas id="qualityChart"></canvas>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Nivel de Madurez por Dominio</h5>
                            <canvas id="maturityChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.recordsContainer.classList.add('d-none');
    },

    renderModule(module) {
        this.recordsContainer.classList.remove('d-none');
        if (!module) return;

        let formHtml = `<h2>${module.title}</h2>`;
        module.fields.forEach(field => {
            formHtml += `
                <div class="mb-3">
                    <label for="${field.name}" class="form-label">${field.label} ${field.required ? '<span class="text-danger">*</span>' : ''}</label>
                    ${this.renderField(field)}
                </div>
            `;
        });

        formHtml += `
            <div class="d-flex flex-wrap gap-2">
                <button class="btn btn-primary btn-save">Añadir Registro</button>
                <button class="btn btn-secondary btn-clear-form">Limpiar Formulario</button>
                <button class="btn btn-danger btn-clear-records">Limpiar Registros</button>
                <button class="btn btn-success btn-export-excel">Exportar a Excel</button>
                <button class="btn btn-info btn-export-pdf">Exportar a PDF</button>
                <input type="file" id="import-excel" class="d-none" accept=".xlsx, .xls">
                <button class="btn btn-warning btn-import" onclick="document.getElementById('import-excel').click()">Importar desde Excel</button>
                <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#importHelpModal">
                    ?
                </button>
            </div>
        `;

        this.appContainer.innerHTML = formHtml;
        this.initializeTooltips();
    },

    renderImportHelpModal(module) {
        const fieldNames = module.fields.map(f => `<code>${f.name}</code>`).join(', ');
        const exampleHeader = module.fields.map(f => f.name).join(' | ');
        const exampleRow = module.fields.map(f => '...').join(' | ');

        this.modalContainer.innerHTML = `
            <div class="modal fade" id="importHelpModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Guía de Importación para: ${module.title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p>Para importar datos correctamente, la primera fila de tu archivo Excel debe contener los siguientes encabezados, exactamente como se muestran:</p>
                            <p>${fieldNames}</p>
                            <p><strong>Ejemplo de estructura:</strong></p>
                            <pre><code>${exampleHeader}\n${exampleRow}</code></pre>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderField(field) {
        const tooltipHtml = field.tooltip ? `data-bs-toggle="tooltip" data-bs-placement="top" title="${field.tooltip}"` : '';
        const requiredHtml = field.required ? 'required' : '';
        let fieldHtml = '';

        switch (field.type) {
            case 'textarea':
                fieldHtml = `<textarea id="${field.name}" name="${field.name}" class="form-control" ${requiredHtml} ${tooltipHtml}></textarea>`;
                break;
            case 'select':
                fieldHtml = `
                    <select id="${field.name}" name="${field.name}" class="form-select" ${requiredHtml} ${tooltipHtml}>
                        <option value="">Seleccionar...</option>
                        ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>`;
                break;
            default:
                fieldHtml = `<input type="${field.type}" id="${field.name}" name="${field.name}" class="form-control" ${requiredHtml} ${tooltipHtml}>`;
        }

        if (field.required) {
            fieldHtml += `<div class="invalid-feedback">Este campo es obligatorio.</div>`;
        }

        return fieldHtml;
    },

    initializeTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    },

    renderTable(module, records) {
        if (records.length === 0) {
            this.recordsTable.innerHTML = '<div class="alert alert-info">No hay registros guardados.</div>';
            return;
        }

        let tableHtml = '<table class="table table-striped table-hover"><thead><tr>';
        module.fields.forEach(field => {
            tableHtml += `<th>${field.label}</th>`;
        });
        tableHtml += '<th>Acciones</th></tr></thead><tbody>';

        records.forEach((record, index) => {
            tableHtml += '<tr>';
            module.fields.forEach(field => {
                tableHtml += `<td>${record[field.name] || ''}</td>`;
            });
            tableHtml += `
                <td>
                    <button class="btn btn-sm btn-primary btn-edit" data-index="${index}">Editar</button>
                    <button class="btn btn-sm btn-danger btn-delete" data-index="${index}">Eliminar</button>
                </td>
            `;
            tableHtml += '</tr>';
        });

        tableHtml += '</tbody></table>';
        this.recordsTable.innerHTML = tableHtml;
    },

    clearForm(module) {
        module.fields.forEach(field => {
            const input = document.getElementById(field.name);
            if (input) {
                input.value = '';
            }
        });
    },

    getFormData(module) {
        const data = {};
        module.fields.forEach(field => {
            const input = document.getElementById(field.name);
            data[field.name] = input.value;
        });
        return data;
    },

    setActiveLink(moduleKey) {
        this.menuLinks.forEach(l => l.classList.remove('active'));
        const link = document.querySelector(`.dropdown-item[data-module="${moduleKey}"]`);
        if (link) {
            link.classList.add('active');
        }
    },

    bindSave(handler) {
        this.appContainer.addEventListener('click', event => {
            if (event.target.classList.contains('btn-save')) {
                handler();
            }
        });
    },

    bindClearForm(handler) {
        this.appContainer.addEventListener('click', event => {
            if (event.target.classList.contains('btn-clear-form')) {
                handler();
            }
        });
    },

    bindClearRecords(handler) {
        this.appContainer.addEventListener('click', event => {
            if (event.target.classList.contains('btn-clear-records')) {
                handler();
            }
        });
    },

    bindImportExcel(handler) {
        this.appContainer.addEventListener('change', event => {
            if (event.target.id === 'import-excel') {
                handler(event.target.files[0]);
            }
        });
    },

    bindExportExcel(handler) {
        // ... (igual que antes)
    },

    bindExportPdf(handler) {
        // ... (igual que antes)
    },

    bindMenu(handler) {
        this.menuLinks.forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                const moduleKey = event.target.dataset.module;
                handler(moduleKey);
            });
        });
    },

    bindEdit(handler) {
        this.recordsTable.addEventListener('click', event => {
            if (event.target.classList.contains('btn-edit')) {
                handler(event.target.dataset.index);
            }
        });
    },

    bindDelete(handler) {
        this.recordsTable.addEventListener('click', event => {
            if (event.target.classList.contains('btn-delete')) {
                handler(event.target.dataset.index);
            }
        });
    }
};

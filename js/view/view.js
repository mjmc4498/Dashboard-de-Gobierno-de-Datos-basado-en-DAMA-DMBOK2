const view = {
    appContainer: document.getElementById('app'),
    recordsTable: document.getElementById('records-table'),
    menuLinks: document.querySelectorAll('.dropdown-item'),

    renderModule(module) {
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
            </div>
        `;

        this.appContainer.innerHTML = formHtml;
        this.initializeTooltips();
    },

    renderField(field) {
        const tooltipHtml = field.tooltip ? `data-bs-toggle="tooltip" data-bs-placement="top" title="${field.tooltip}"` : '';
        switch (field.type) {
            case 'textarea':
                return `<textarea id="${field.name}" name="${field.name}" class="form-control" ${field.required ? 'required' : ''} ${tooltipHtml}></textarea>`;
            case 'select':
                return `
                    <select id="${field.name}" name="${field.name}" class="form-select" ${tooltipHtml}>
                        ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>`;
            default:
                return `<input type="${field.type}" id="${field.name}" name="${field.name}" class="form-control" ${field.required ? 'required' : ''} ${tooltipHtml}>`;
        }
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

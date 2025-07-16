const view = {
    appContainer: document.getElementById('app'),
    recordsTable: document.getElementById('records-table'),
    menuLinks: document.querySelectorAll('.dropdown-content a'),

    renderModule(module) {
        if (!module) return;

        let formHtml = `<h2>${module.title}</h2>`;
        module.fields.forEach(field => {
            formHtml += `
                <div class="form-group">
                    <label for="${field.name}">${field.label} ${field.required ? '*' : ''}</label>
                    ${this.renderField(field)}
                    ${field.tooltip ? `<span class="tooltip">? <span class="tooltiptext">${field.tooltip}</span></span>` : ''}
                </div>
            `;
        });

        formHtml += `
            <div class="buttons">
                <button class="btn btn-primary btn-save">Añadir Registro</button>
                <button class="btn btn-secondary btn-clear-form">Limpiar Formulario</button>
                <button class="btn btn-danger btn-clear-records">Limpiar Registros</button>
                <button class="btn btn-export btn-excel">Exportar a Excel</button>
                <button class="btn btn-export btn-pdf">Exportar a PDF</button>
                <input type="file" id="import-excel" style="display: none;" accept=".xlsx, .xls">
                <button class="btn btn-import" onclick="document.getElementById('import-excel').click()">Importar desde Excel</button>
            </div>
        `;

        this.appContainer.innerHTML = formHtml;
    },

    renderField(field) {
        // ... (igual que antes)
    },

    renderTable(module, records) {
        if (records.length === 0) {
            this.recordsTable.innerHTML = '<p>No hay registros guardados.</p>';
            return;
        }

        let tableHtml = '<table><thead><tr>';
        module.fields.forEach(field => {
            tableHtml += `<th>${field.label}</th>`;
        });
        tableHtml += '</tr></thead><tbody>';

        records.forEach(record => {
            tableHtml += '<tr>';
            module.fields.forEach(field => {
                tableHtml += `<td>${record[field.name] || ''}</td>`;
            });
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
    }
};

const view = {
    appContainer: document.getElementById('app'),
    menuLinks: document.querySelectorAll('.menu a'),

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
                <button class="btn btn-primary btn-save">Guardar</button>
                <button class="btn btn-secondary btn-clear">Limpiar</button>
                <button class="btn btn-export btn-excel">Exportar a Excel</button>
                <button class="btn btn-export btn-pdf">Exportar a PDF</button>
            </div>
        `;

        this.appContainer.innerHTML = formHtml;
    },

    renderField(field) {
        switch (field.type) {
            case 'textarea':
                return `<textarea id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}></textarea>`;
            case 'select':
                return `
                    <select id="${field.name}" name="${field.name}">
                        ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>`;
            default:
                return `<input type="${field.type}" id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>`;
        }
    },

    loadData(module, data) {
        if (data) {
            module.fields.forEach(field => {
                const input = document.getElementById(field.name);
                if (input && data[field.name]) {
                    input.value = data[field.name];
                }
            });
        }
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
        const link = document.querySelector(`.menu a[data-module="${moduleKey}"]`);
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

    bindClear(handler) {
        this.appContainer.addEventListener('click', event => {
            if (event.target.classList.contains('btn-clear')) {
                handler();
            }
        });
    },

    bindExportExcel(handler) {
        this.appContainer.addEventListener('click', event => {
            if (event.target.classList.contains('btn-excel')) {
                handler();
            }
        });
    },

    bindExportPdf(handler) {
        this.appContainer.addEventListener('click', event => {
            if (event.target.classList.contains('btn-pdf')) {
                handler();
            }
        });
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

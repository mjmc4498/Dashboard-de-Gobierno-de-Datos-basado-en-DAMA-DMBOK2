const controller = {
    currentModuleKey: null,

    init() {
        view.bindMenu(this.handleMenuClick.bind(this));
        view.bindSave(this.handleSave.bind(this));
        view.bindClear(this.handleClear.bind(this));
        view.bindExportExcel(this.handleExportExcel.bind(this));
        view.bindExportPdf(this.handleExportPdf.bind(this));

        // Cargar el primer módulo por defecto
        const firstModuleKey = view.menuLinks[0].dataset.module;
        this.loadModule(firstModuleKey);
    },

    loadModule(moduleKey) {
        this.currentModuleKey = moduleKey;
        const module = model.getModule(moduleKey);
        view.renderModule(module);
        view.setActiveLink(moduleKey);
        const data = model.loadData(moduleKey);
        if (data) {
            view.loadData(module, data);
        }
    },

    handleMenuClick(moduleKey) {
        this.loadModule(moduleKey);
    },

    handleSave() {
        const module = model.getModule(this.currentModuleKey);
        const data = view.getFormData(module);
        model.saveData(this.currentModuleKey, data);
        alert('¡Progreso guardado localmente!');
    },

    handleClear() {
        const module = model.getModule(this.currentModuleKey);
        view.clearForm(module);
        model.clearData(this.currentModuleKey);
        alert('Formulario limpiado.');
    },

    handleExportExcel() {
        const module = model.getModule(this.currentModuleKey);
        const data = view.getFormData(module);
        const exportData = module.fields.map(field => ({
            'Campo': field.label,
            'Valor': data[field.name]
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, module.title);
        XLSX.writeFile(workbook, `${module.title}.xlsx`);
    },

    handleExportPdf() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const module = model.getModule(this.currentModuleKey);
        const data = view.getFormData(module);

        doc.setFontSize(18);
        doc.text(module.title, 14, 22);
        doc.setFontSize(11);
        let y = 30;

        module.fields.forEach(field => {
            doc.text(`${field.label}:`, 14, y);
            doc.text(data[field.name] || '', 14, y + 6, { maxWidth: 180 });
            y += 20;
        });

        doc.save(`${module.title}.pdf`);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    controller.init();
});

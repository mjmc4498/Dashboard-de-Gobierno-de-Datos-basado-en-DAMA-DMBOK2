const controller = {
    currentModuleKey: null,
    editingIndex: null,

    init() {
        view.bindMenu(this.handleMenuClick.bind(this));
        view.bindSave(this.handleSave.bind(this));
        view.bindClearForm(this.handleClearForm.bind(this));
        view.bindClearRecords(this.handleClearRecords.bind(this));
        view.bindImportExcel(this.handleImportExcel.bind(this));
        view.bindExportExcel(this.handleExportExcel.bind(this));
        view.bindExportPdf(this.handleExportPdf.bind(this));
        view.bindEdit(this.handleEdit.bind(this));
        view.bindDelete(this.handleDelete.bind(this));

        const firstModuleKey = view.menuLinks[0].dataset.module;
        this.loadModule(firstModuleKey);
    },

    loadModule(moduleKey) {
        this.currentModuleKey = moduleKey;
        this.editingIndex = null;
        const module = model.getModule(moduleKey);
        view.renderModule(module);
        view.setActiveLink(moduleKey);
        this.updateRecordsTable();
    },

    updateRecordsTable() {
        const module = model.getModule(this.currentModuleKey);
        const records = model.getRecords(this.currentModuleKey);
        view.renderTable(module, records);
    },

    handleMenuClick(moduleKey) {
        this.loadModule(moduleKey);
    },

    handleSave() {
        const module = model.getModule(this.currentModuleKey);
        const record = view.getFormData(module);

        if (this.editingIndex !== null) {
            model.updateRecord(this.currentModuleKey, this.editingIndex, record);
            this.editingIndex = null;
        } else {
            model.addRecord(this.currentModuleKey, record);
        }

        this.updateRecordsTable();
        view.clearForm(module);
    },

    handleClearForm() {
        const module = model.getModule(this.currentModuleKey);
        view.clearForm(module);
        this.editingIndex = null;
    },

    handleClearRecords() {
        if (confirm('¿Estás seguro de que quieres borrar todos los registros de este módulo?')) {
            model.clearRecords(this.currentModuleKey);
            this.updateRecordsTable();
        }
    },

    handleEdit(index) {
        this.editingIndex = index;
        const module = model.getModule(this.currentModuleKey);
        const records = model.getRecords(this.currentModuleKey);
        const record = records[index];

        module.fields.forEach(field => {
            document.getElementById(field.name).value = record[field.name] || '';
        });
    },

    handleDelete(index) {
        if (confirm('¿Estás seguro de que quieres borrar este registro?')) {
            model.deleteRecord(this.currentModuleKey, index);
            this.updateRecordsTable();
        }
    },

    handleImportExcel(file) {
        if (!file) return;
        model.loadRecordsFromExcel(file, (records) => {
            records.forEach(record => model.addRecord(this.currentModuleKey, record));
            this.updateRecordsTable();
        });
    },

    handleExportExcel() {
        const module = model.getModule(this.currentModuleKey);
        const records = model.getRecords(this.currentModuleKey);
        const worksheet = XLSX.utils.json_to_sheet(records);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, module.title);
        XLSX.writeFile(workbook, `${module.title}_registros.xlsx`);
    },

    handleExportPdf() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const module = model.getModule(this.currentModuleKey);
        const records = model.getRecords(this.currentModuleKey);

        doc.setFontSize(18);
        doc.text(module.title, 14, 22);

        const tableData = records.map(record =>
            module.fields.map(field => record[field.name] || '')
        );

        doc.autoTable({
            head: [module.fields.map(field => field.label)],
            body: tableData,
            startY: 30,
        });

        doc.save(`${module.title}_registros.pdf`);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    controller.init();
});

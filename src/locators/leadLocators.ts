export const LeadLocators = {
    // Leads tab on Sales App
    leadsTab: '//one-app-nav-bar-item-root//a[@title="Leads"]', // reliable Lightning tab selector

    // New Lead button
    newLeadButton: '//div[@title="New"]',
    displayAsBtn: 'button[title^="Display as"], button.slds-button_icon-more',

    pipelineTable: 'table[role="grid"]',


    // Lead form fields
    firstNameInput: 'input[name="firstName"]',
    lastNameInput: 'input[name="lastName"]',
    companyInput: 'input[name="Company"]',

    // Lead Source dropdown
    leadSourceDropdown: 'button[aria-label="Lead Source, --None--"]',
    leadSourceItem: (source: string) => `//lightning-base-combobox-item[@data-value="${source}"]`,

    // Save button
    saveButton: 'button[name="SaveEdit"]',

    // Dynamic Row Helper: finds a row containing specific text
    rowByText: (text: string) => `tr:has-text("${text}")`,
    statusEditButton: 'button[title^="Edit Status"]',

    // Lead ID on detail view
    leadIdField: 'span[data-aura-class="forceOutputText"] >> nth=0', // first span usually has ID

    // Status dropdown on Lead detail page
    statusDropdown: 'button[aria-label^="Status"]',
    statusItem: (status: string) => `//lightning-base-combobox-item[@data-value="${status}"]`,
    // Inline Edit Controls
    inlinePicklist: 'button[aria-label^="Status"]',
    picklistOption: (status: string) => `lightning-base-combobox-item >> text="${status}"`,
    inlineSaveBtn: 'button:has-text("Save")',

    // The specific option in that dropdown
    tableViewOption: 'role=menuitem >> text="Table"',

    // FIX: Using the specific title attribute to avoid the strict mode violation
    viewSwitcherBtn: 'button[title="Select a List View: Leads"]',

    // This is the option you want to click inside that menu
    pipelineOption: 'role=menuitem >> text="Pipeline Inspection"',

    // Column name as seen in your screenshot
    intelligenceViewToggle: 'button[name="pipelineInspectionToListView"]',

    // Column header for the status
    statusCell: 'td[data-label="Lead Status"]',
    inlineEditBtn: 'button.slds-cell-edit__button',
    statusOption: (status: string) => `lightning-base-combobox-item >> text="${status}"`,
    dropdownOption: (status: string) => `lightning-base-combobox-item:has-text("${status}")`,

};
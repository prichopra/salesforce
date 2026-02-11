export const ConvertLeadLocators = {
    // Add these two lines to fix the TS2339 error
    leadTable: 'table[role="grid"], table.slds-table',
    tableRows: 'tr',

    // Keep your existing locators below
    leadStatusHeader: 'th[title="Lead Status"]',
    unconvertedLeadRow: 'tr',
    leadNameLink: 'a[data-refid="recordId"], a.slds-truncate',
    //convertTrigger: 'runtime_sales_lead.runtime_sales_leadConvert',
    //modalConvertBtn: 'button.slds-button_brand:has-text("Convert"), .modal-footer button.brand',
    successHeader: '.entityNameTitle',
    //actionsDropdown: '.forceActionsContainer button.slds-button_icon-border-filled, .slds-page-header button.slds-button_icon-border-filled',
    //goOppBtn: 'button:has-text("Go to Opportunity")',
    pathStatusItem: (status: string) => `li.slds-path__item:has-text("${status}")`,
    markStatusCompleteBtn: 'button.slds-path__mark-complete',

    // Updated: Targets the specific "More Actions" dropdown on the record page
    actionsDropdown: 'button:has-text("Show more actions"), button[title="Show more actions"]',

    // Updated: Targets the Convert button inside that dropdown
    convertTrigger: 'runtime_sales_lead.runtime_sales_leadConvert, slot lightning-menu-item:has-text("Convert")',

    // Updated: Targets the final Convert button in the modal
    modalConvertBtn: 'button.slds-button_brand:has-text("Convert")',

    goOppBtn: 'button:has-text("Go to Opportunity")',

    convertModal: 'div.slds-modal:has-text("Convert Lead")',

    // Updated: Based on your latest screenshot
    goLeadsBtn: 'button:has-text("Go to Leads")',

    // Optional: If you want to click the specific Opportunity created
    opportunityLink: '.summarySection a[href*="Opportunity"]',
};
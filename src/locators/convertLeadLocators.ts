export const ConvertLeadLocators = {
    // --- Lead List View ---
    leadTable: 'table[role="grid"], table.slds-table',
    tableRows: 'tr',
    leadStatusHeader: 'th[title="Lead Status"]',
    unconvertedLeadRow: 'tr',
    leadNameLink: 'a[data-refid="recordId"], a.slds-truncate',

    // --- Lead Record Page ---
    actionsDropdown: 'button:has-text("Show more actions"), button[title="Show more actions"]',
    pathStatusItem: (status: string) => `li.slds-path__item:has-text("${status}")`,
    markStatusCompleteBtn: 'button.slds-path__mark-complete',
    convertTrigger: 'button:has-text("Convert"), a[title="Convert"]',

    // --- Conversion Modal ---
    convertModal: 'div.slds-modal:has-text("Convert Lead")',
    modalConvertBtn: '.modal-footer button.slds-button_brand:has-text("Convert")',

    // --- Success Modal & Summary ---
    successModal: '.slds-modal__container',
    successHeader: 'h2:has-text("Your lead has been converted")',
    accountLinkOnSuccess: '.slds-conversion-status__item:has-text("ACCOUNT") a.slds-truncate',
    opportunityLinkOnSuccess: '.slds-conversion-status__item:has-text("OPPORTUNITY") a.slds-truncate',
    opportunityAccountNameValue: '.slds-conversion-status__item:has-text("OPPORTUNITY") .slds-form-element__static:has-text("Account Name")',
    goToLeadsBtn: 'button:has-text("Go to Leads")',

    // --- Opportunity Navigation & List View ---
    opportunitiesTab: 'a[title="Opportunities"], a:has-text("Opportunities")',
    opportunitySearch: 'input[name="Opportunity-search-input"]',
    opportunitySearchResult: (name: string) => `a[title*="${name}"]`,
    firstOpportunityRowLink: 'table tbody tr:first-child th a, table tbody tr:first-child td:nth-child(2) a',
    tableDataLink: 'table tbody tr:first-child th a, table tbody tr:first-child td a',

    // --- Opportunity Record Validation (Header) ---
    headerAmount: 'p.slds-text-title:has-text("Amount") + p slot lightning-formatted-text',
    headerOwner: 'p.slds-text-title:has-text("Opportunity Owner") + p slot lightning-formatted-lookup a',
    oppStageField: '.slds-path__item.slds-is-active',

    // --- Opportunity Record Validation (Details/Related) ---
    oppAmountLabel: 'span.test-id__field-label:has-text("Amount")',
    oppAmountValue: 'lightning-formatted-text[data-output-element-id="output-field"]',
    oppOwnerLabel: 'span.test-id__field-label:has-text("Opportunity Owner")',
    oppOwnerValue: 'slot[name="output"] .ownerName, lightning-formatted-lookup a',
    stageHistorySection: 'article:has-text("Stage History")',
    stageHistoryAmount: 'article:has-text("Stage History") slot[name="output"] lightning-formatted-text'
};
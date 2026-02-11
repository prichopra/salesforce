export const OpportunityLocators = {
    // Header elements to verify we landed on the right page
    headerTitle: 'slot[name="primaryField"] lightning-formatted-text',

    // Stage/Path validation (The chevron bar at the top)
    activeStage: '.slds-path__item.slds-is-active',

    // Field details for validation
    accountNameField: 'records-record-layout-item[field-label="Account Name"] a',
    amountField: 'records-record-layout-item[field-label="Amount"] lightning-formatted-text',
    ownerField: 'records-record-layout-item[field-label="Owner"] a'
};
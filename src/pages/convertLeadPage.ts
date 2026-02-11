import { Page, expect } from '@playwright/test';
import { ConvertLeadLocators } from '../locators/convertLeadLocators';

export class ConvertLeadPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async openAvailableLeadForConversion(): Promise<boolean> {
        console.log("--- Scanning table for an unconverted lead ---");

        // Wait for table to load
        await this.page.locator(ConvertLeadLocators.leadTable).waitFor({ state: 'visible', timeout: 30000 });

        // Using your precise filter logic: Status NOT 'Closed - Converted'
        const unconvertedRow = this.page.locator(ConvertLeadLocators.tableRows).filter({
            has: this.page.locator('td[data-label="Lead Status"]').filter({
                hasNotText: 'Closed - Converted'
            })
        }).first();

        // Check if a row exists
        if (await unconvertedRow.count() === 0) {
            return false;
        }

        // Find the link within that specific row
        const leadLink = unconvertedRow.locator(ConvertLeadLocators.leadNameLink).first();

        await leadLink.waitFor({ state: 'visible', timeout: 30000 });
        const name = await leadLink.innerText();
        console.log(`--- Selected Lead for Conversion: ${name} ---`);

        await leadLink.click();
        return true;
    }
    async sortAndSelectUnconvertedLead() {
        console.log("--- Sorting table to find unconverted leads ---");

        const statusHeader = this.page.locator(ConvertLeadLocators.leadStatusHeader);
        await statusHeader.waitFor({ state: 'visible' });

        // Sort the list (clicking once or twice depending on current sort state)
        await statusHeader.click();
        await this.page.waitForTimeout(2000); // Animation buffer for Salesforce LWC

        // Identify the first row that isn't 'Closed - Converted'
        const leadRow = this.page.locator(ConvertLeadLocators.unconvertedLeadRow).first();
        const leadLink = leadRow.locator(ConvertLeadLocators.leadNameLink);

        await leadLink.scrollIntoViewIfNeeded();
        console.log("--- Selecting Lead for Conversion ---");
        await leadLink.click({ force: true });
    }

    /**
     * Searches the grid for a Lead that is NOT converted and is in "Working" status.
     */

    async moveStatusToClosed(statusName: string = 'Closed - Not Converted') {
        console.log(`--- Updating Status to: ${statusName} ---`);

        // 1. Ensure the chevron is selected
        const chevron = this.page.locator(ConvertLeadLocators.pathStatusItem(statusName));
        await chevron.click({ force: true });

        // 2. THE CHROME RESOLUTION: Polling Click
        // This ensures that even if the first click is 'ignored' by Salesforce, we try again.
        const markBtn = this.page.locator(ConvertLeadLocators.markStatusCompleteBtn).first();
        await markBtn.waitFor({ state: 'visible', timeout: 15000 });

        console.log("--- Attempting to click Mark Status as Complete ---");

        // We try to click up to 3 times with a small delay between attempts
        for (let i = 0; i < 3; i++) {
            await markBtn.click({ force: true });
            await this.page.waitForTimeout(1500); // Wait to see if the UI reacts

            // If the button is gone, the click worked!
            if (!(await markBtn.isVisible())) {
                console.log("--- Status update successful ---");
                break;
            }
            console.log(`--- Click attempt ${i + 1} failed to transition UI, retrying... ---`);
        }
    }

    async executeConversion() {
        console.log("--- Starting Conversion Sequence ---");

        // 1. Check if the Convert Modal is already open
        const modal = this.page.locator(ConvertLeadLocators.convertModal);
        const isModalOpen = await modal.isVisible();

        if (!isModalOpen) {
            const convertTrigger = this.page.locator(ConvertLeadLocators.convertTrigger).first();

            if (!(await convertTrigger.isVisible())) {
                console.log("--- Convert button hidden, opening 'More Actions' dropdown ---");
                const dropdown = this.page.locator(ConvertLeadLocators.actionsDropdown).first();
                await dropdown.waitFor({ state: 'visible', timeout: 10000 });

                // Use force: true if something else is slightly overlapping
                await dropdown.click({ force: true });
                await this.page.waitForTimeout(1000);
            }

            await convertTrigger.waitFor({ state: 'visible', timeout: 10000 });
            await convertTrigger.click();
        } else {
            console.log("--- Convert Modal already detected, proceeding to final conversion ---");
        }

        // 2. Click the 'Convert' button inside the Modal
        const modalBtn = this.page.locator(ConvertLeadLocators.modalConvertBtn).last();
        await modalBtn.waitFor({ state: 'visible', timeout: 20000 });

        // The screenshot shows this button is blue (brand).
        // If regular click fails, use force because of the overlap error you saw.
        await modalBtn.click({ force: true });

        // 3. Finalize
        const goOpp = this.page.locator(ConvertLeadLocators.goOppBtn);
        await goOpp.waitFor({ state: 'visible', timeout: 20000 });
        await goOpp.click();
    }
}
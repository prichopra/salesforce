// src/pages/leadsPage.ts
import {expect, Page} from '@playwright/test';
import { LeadLocators } from '../locators/leadLocators';
import { ENV } from '../config/env';

export class LeadsPage {
    constructor(private page: Page) {}

    async openLeadsTab() {
        const leadsTab = this.page.locator(LeadLocators.leadsTab);
        await leadsTab.waitFor({ state: 'visible', timeout: 30000 });
        await this.page.locator(LeadLocators.leadsTab).click();

        // Salesforce stability: Click and wait. If the "New" button doesn't appear, click again.
        // This is a common pattern for slow-loading Lightning Apps.
        await leadsTab.click({ force: true });

        const newBtn = this.page.locator(LeadLocators.newLeadButton);

        // Try to find the 'New' button; if it fails in 10s, click Leads tab again
        try {
            await newBtn.waitFor({ state: 'visible', timeout: 10000 });
        } catch (e) {
            console.log('Leads page did not load, retrying click on Leads tab...');
            await leadsTab.click({ force: true });
            await newBtn.waitFor({ state: 'visible', timeout: 20000 });
        }
    }

    async createLead({ firstName, lastName, company, leadSource }: any) {
        const newButton = this.page.locator(LeadLocators.newLeadButton);
        await newButton.waitFor({ state: 'visible', timeout: 20000 });
        await newButton.click({ force: true });

        // Wait for modal to render
        await this.page.locator(LeadLocators.firstNameInput).waitFor({ state: 'visible' });
        await this.page.locator(LeadLocators.firstNameInput).fill(firstName);
        await this.page.locator(LeadLocators.lastNameInput).fill(lastName);
        await this.page.locator(LeadLocators.companyInput).fill(company);

        // --- Stabilized Dropdown Handling ---
        const dropdown = this.page.locator('button[aria-label^="Lead Source"]');
        await dropdown.scrollIntoViewIfNeeded();
        await dropdown.click();

        // FIX: Target the specific span with exact text and pick the last one
        // to resolve the 'strict mode violation' (2 elements found)
        const option = this.page.locator('lightning-base-combobox-item')
            .filter({ hasText: new RegExp(`^${leadSource}$`) })
            .last();

        await option.waitFor({ state: 'visible', timeout: 10000 });
        await option.click();
    }

    async saveLead() {
        await this.page.locator(LeadLocators.saveButton).click();
        // Wait for the URL to change to the view mode
        await this.page.waitForURL('**/view', { timeout: 30000 });
    }

    async getLeadId(): Promise<string> {
        // Wait for the URL to contain the Lead prefix (00Q is the standard Lead prefix)
        await this.page.waitForURL(/.*\/Lead\/00Q[a-zA-Z0-9]{15}.*/, { timeout: 30000 });

        const url = this.page.url();
        // Regex to grab the 18 characters starting with 00Q
        const matches = url.match(/00Q[a-zA-Z0-9]{15}/);

        if (matches) {
            const id = matches[0];
            console.log(`Captured Lead ID: ${id}`);
            return id;
        }
        throw new Error("Could not find 18-digit Lead ID in the URL");
    }

    async validateLeadIdFormat(leadId: string) {
        expect(leadId.length).toBe(18);
    }

    async switchToPipelineAndChangeStatus(fullName: string, status: string) {
        console.log(`--- Changing status to ${status} for ${fullName} ---`);
        await this.page.locator(LeadLocators.leadsTab).click();

        // 1. Ensure we are in the List View (Pipeline Inspection toggle)
        const toggle = this.page.locator(LeadLocators.intelligenceViewToggle);
        if (await toggle.isVisible()) {
            await toggle.click();
            await this.page.waitForTimeout(2000);
        }

        // 2. Find the row and the specific status cell
        const leadRow = this.page.locator(`tr:has-text("${fullName}")`).first();
        const cell = leadRow.locator(LeadLocators.statusCell);

        await cell.scrollIntoViewIfNeeded();
        await cell.locator(LeadLocators.inlineEditBtn).click();

        // 3. EXPLICIT CLICK APPROACH (Replacement for Keyboard)
        // Click the combobox to open the dropdown
        const combobox = this.page.locator('button[aria-haspopup="listbox"]').filter({ hasText: /Open|New|Working|Closed/ });
        await combobox.click();

        // Click the specific status option
        const option = this.page.locator(LeadLocators.dropdownOption(status));
        await option.waitFor({ state: 'visible' });
        await option.click();

        // 4. SAVE
        const save = this.page.locator(LeadLocators.inlineSaveBtn).filter({ visible: true }).first();
        await save.click();

        // This prevents the redirect: Wait for the "Success" toast message to appear/disappear
        await this.page.locator('.forceVisualMessageQueue').waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});

        console.log(`Status change saved for ${fullName}`);

        }
}

import { Page, expect } from '@playwright/test';
import { OpportunityLocators as LOC } from '../locators/opportunityLocators';

export class OpportunityPage {
    constructor(private page: Page) {}

    async verifyConversionSuccess(companyName: string) {
        console.log(`--- Validating Opportunity for ${companyName} ---`);

        // 1. Ensure the URL has changed to Opportunity
        await this.page.waitForURL(/\/lightning\/r\/Opportunity\//, { timeout: 30000 });

        // 2. Validate Header shows Company Name
        const header = this.page.locator(LOC.headerTitle);
        await expect(header).toContainText(companyName);

        // 3. Validate Default Stage is 'Qualification'
        const stage = this.page.locator(LOC.activeStage);
        await expect(stage).toContainText('Qualification');

        // 4. Validate Account Link matches the Lead's Company
        const accountLink = this.page.locator(LOC.accountNameField);
        await expect(accountLink).toContainText(companyName);

        console.log("--- Opportunity Validation Passed ---");
    }


}
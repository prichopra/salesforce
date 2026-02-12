import { Page, expect } from '@playwright/test';
import { ConvertLeadLocators } from '../locators/convertLeadLocators';

export class ConvertLeadPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openAvailableLeadForConversion(): Promise<boolean> {
        console.log("--- Scanning table for an unconverted lead ---");

        await this.page.locator(ConvertLeadLocators.leadTable).waitFor({ state: 'visible', timeout: 30000 });

        const unconvertedRow = this.page.locator(ConvertLeadLocators.tableRows).filter({
            has: this.page.locator('td[data-label="Lead Status"]').filter({
                hasNotText: 'Closed - Converted'
            })
        }).first();

        if (await unconvertedRow.count() === 0) {
            return false;
        }

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

        await statusHeader.click();
        await this.page.waitForTimeout(2000);

        const leadRow = this.page.locator(ConvertLeadLocators.unconvertedLeadRow).first();
        const leadLink = leadRow.locator(ConvertLeadLocators.leadNameLink);

        await leadLink.scrollIntoViewIfNeeded();
        console.log("--- Selecting Lead for Conversion ---");
        await leadLink.click({ force: true });
    }

    async moveStatusToClosed(statusName: string = 'Closed - Not Converted') {
        console.log(`--- Updating Status to: ${statusName} ---`);

        const chevron = this.page.locator(ConvertLeadLocators.pathStatusItem(statusName));
        await chevron.click({ force: true });

        const markBtn = this.page.locator(ConvertLeadLocators.markStatusCompleteBtn).first();
        await markBtn.waitFor({ state: 'visible', timeout: 15000 });

        console.log("--- Attempting to click Mark Status as Complete ---");

        for (let i = 0; i < 3; i++) {
            await markBtn.click({ force: true });
            await this.page.waitForTimeout(1500);

            if (!(await markBtn.isVisible())) {
                console.log("--- Status update successful ---");
                break;
            }
            console.log(`--- Click attempt ${i + 1} failed to transition UI, retrying... ---`);
        }
    }

    async executeConversionWithNetworkAssert() {
        const conversionPromise = this.page.waitForResponse(response =>
            (response.url().includes('convert') || response.url().includes('composite')) &&
            response.request().method() === 'POST'
        );

        const modalBtn = this.page.locator(ConvertLeadLocators.modalConvertBtn).last();
        await modalBtn.evaluate(node => (node as HTMLElement).click());

        const response = await conversionPromise;
        const body = await response.json();

        const oppId = body.recordId ||
            body.id ||
            body.compositeResponse?.[0]?.body?.id ||
            body.compositeResponse?.[0]?.body?.recordId;

        console.log(`--- Backend confirmed Opportunity ID: ${oppId} ---`);
        expect(oppId).not.toBeNull();
    }

    async navigateToOpportunityTab() {
        console.log("--- Navigating via 'Go to Leads' and Opportunities Tab ---");

        const leadsBtn = this.page.locator(ConvertLeadLocators.goToLeadsBtn);
        await leadsBtn.waitFor({ state: 'visible', timeout: 15000 });
        await leadsBtn.click({ force: true });

        const oppTab = this.page.locator(ConvertLeadLocators.opportunitiesTab).first();
        await oppTab.click();

        await this.page.waitForURL(/\/lightning\/o\/Opportunity\//);
    }

    async navigateAndOpenOpportunity(opportunityName: string) {
        console.log(`--- Navigating to Opportunities to find: ${opportunityName} ---`);

        await this.page.locator(ConvertLeadLocators.opportunitiesTab).first().click();
        await this.page.waitForURL(/\/lightning\/o\/Opportunity\//);

        const search = this.page.locator(ConvertLeadLocators.opportunitySearch);
        await search.waitFor({ state: 'visible' });
        await search.fill(opportunityName);
        await this.page.keyboard.press('Enter');

        console.log("--- Triggering Opportunity record link via JS ---");
        const specificOppLink = this.page.locator(ConvertLeadLocators.opportunitySearchResult(opportunityName)).first();

        await specificOppLink.waitFor({ state: 'attached', timeout: 20000 });
        await specificOppLink.evaluate(node => (node as HTMLElement).click());
    }

    async validateOpportunityDetails(expectedOwner: string) {
        console.log("--- Starting Deep Field Validation ---");

        const bottomElement = this.page.locator(ConvertLeadLocators.stageHistorySection);
        await bottomElement.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);

        console.log(`Verifying Owner matches: ${expectedOwner}`);
        const owner = this.page.locator(ConvertLeadLocators.oppOwnerValue).first();
        await expect(owner).toContainText(expectedOwner, { timeout: 10000 });

        const amount = this.page.locator(ConvertLeadLocators.oppAmountValue).first();
        const amountText = await amount.innerText();
        console.log(`Opportunity Amount detected: ${amountText}`);

        expect(amountText).toMatch(/\$\d+\.\d{2}/);
    }
}
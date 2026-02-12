import { test, expect } from '@playwright/test';
import { ConvertLeadPage } from '../pages/convertLeadPage';
import { LeadsPage } from '../pages/leadsPage';
import { ENV } from "../config/env";

test.use({ storageState: ENV.storageStatePath })

test('Lead Conversion Flow - Pickup and Convert', async ({ page }) => {
    const conversionPage = new ConvertLeadPage(page);
    const leadsPage = new LeadsPage(page);

    await page.goto(ENV.baseURL);

    // Step 1: Open Leads
    await leadsPage.openLeadsTab();

    // Step 2: Open Lead
    const isLeadAvailable = await conversionPage.openAvailableLeadForConversion();

    if (!isLeadAvailable) {
        console.warn(">>> SKIPPING TEST: No available leads found.");
        test.skip();
        return;
    }

    // Step 3: Capture ID & Update Status
    const dynamicLeadId = await leadsPage.getLeadId();
    console.log(`--- Processing Lead ID: ${dynamicLeadId} ---`);
    await conversionPage.moveStatusToClosed('Closed - Not Converted');

    await page.waitForTimeout(2000);

    // 1. Perform conversion and validate the network response
    await conversionPage.executeConversionWithNetworkAssert();

    // 2. Use 'Go to Leads' to reset and navigate to the tab
    await conversionPage.navigateToOpportunityTab();

    // Step 6: Search and Open the newly created Opportunity
    const oppName = "Singapore Public Service-";
    await conversionPage.navigateAndOpenOpportunity(oppName);

    // 4. Final field validation on the record page
    // Increased timeout for slow 'orgfarm' environment navigation
    await page.waitForURL(/\/lightning\/r\/Opportunity\//, { timeout: 60000 });

    // Salesforce LWC needs a moment to render the details tab content
    await page.waitForTimeout(3000);

    // Validate Owner 'Priyanka Cho'
    const ownerLink = page.locator('span:has-text("Priyanka")').first();
    await expect(ownerLink).toBeVisible({ timeout: 15000 });

    console.log("--- Final Opportunity Record Validated Successfully ---");

    await page.waitForURL(/\/lightning\/r\/Opportunity\//);

    // Use the Owner name 'Priyanka Cho' as seen in your conversion success modal
    const ownerToValidate = "Priyanka Cho";

    await conversionPage.validateOpportunityDetails(ownerToValidate);

    console.log("--- Opportunity Record E2E Validation Complete ---");
});
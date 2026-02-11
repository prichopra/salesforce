import { test } from '@playwright/test';
import { ConvertLeadPage } from '../pages/convertLeadPage';
import { LeadsPage } from '../pages/leadsPage';
import {ENV} from "../config/env";

test.use({ storageState: ENV.storageStatePath })

test('Lead Conversion Flow - Pickup and Convert', async ({ page }) => {
    const conversionPage = new ConvertLeadPage(page);
    const leadsPage = new LeadsPage(page);

    await page.goto(ENV.baseURL);

    // Step 1: Open the Leads Tab
    await leadsPage.openLeadsTab();

    // Step 2: Scan and Open an unconverted lead
    // We moved the complex 'tr' filtering into the Page Object for cleanliness
    const isLeadAvailable = await conversionPage.openAvailableLeadForConversion();

    // Logic: If no lead matches the criteria, skip the test
    if (!isLeadAvailable) {
        console.warn(">>> SKIPPING TEST: No 'Working' or unconverted leads found in the grid.");
        test.skip();
        return;
    }

    // Step 3: Capture the ID
    // This will only run if a lead was successfully clicked in Step 2
    const dynamicLeadId = await leadsPage.getLeadId();
    console.log(`--- Processing Lead ID: ${dynamicLeadId} ---`);

    // Step 4: Progression and Conversion
    // Note: I've kept moveStatusToClosed and executeConversion as per your flow
    await conversionPage.moveStatusToClosed('Closed - Not Converted');

    // Stability buffer as per your current working code
    await page.waitForTimeout(5000);

    await conversionPage.executeConversion();

    console.log("--- Conversion Sequence Completed ---");
});

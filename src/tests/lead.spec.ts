import { test, expect } from '@playwright/test';
import { ENV } from '../config/env';
import { AppLauncherPage } from '../pages/appLauncherPage';
import { LeadsPage } from '../pages/leadsPage';
import { generateUniqueLead } from '../utils/testData'; // Using your new path

test.use({ storageState: ENV.storageStatePath });

test('Lead E2E - Data-Driven Dynamic Flow', async ({ page }) => {
    const leadPage = new LeadsPage(page);
    const appLauncher = new AppLauncherPage(page);

    // Using activeLead to avoid any TS2451 name conflicts
    const activeLead = generateUniqueLead();

    // 1. Navigation
    await page.goto(`${ENV.baseURL}${ENV.urls.home}`);
    await appLauncher.openApp('Sales');

    // 2. Create Lead
    await leadPage.openLeadsTab();
    await leadPage.createLead(activeLead);
    await leadPage.saveLead();

    // 3. Capture Dynamic 18-digit ID
    const dynamicLeadId = await leadPage.getLeadId();
    console.log(`Generated Lead ID: ${dynamicLeadId}`);
    expect(dynamicLeadId.length).toBe(18);

    // 4. Perform the status change in the Pipeline/Grid View
    // This uses your working Keyboard + Save logic
    await leadPage.switchToPipelineAndChangeStatus(activeLead.fullName, activeLead.status);

    // 5. Final Validation - Stay on Leads Tab
    // Instead of navigating away, we validate the row in the current grid
    console.log(`--- Verifying status in grid for: ${activeLead.fullName} ---`);

    const leadRow = page.locator(`tr:has-text("${activeLead.fullName}")`).first();
    const statusCell = leadRow.locator('td[data-label="Lead Status"]');

    // Validate the status changed to "Working - Contacted"
    await expect(statusCell).toContainText(activeLead.status);

    console.log(`--- TEST PASSED: Status verified as ${activeLead.status} on Leads Tab ---`);
});
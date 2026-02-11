import { test, expect } from '@playwright/test';
import { LeadPage } from '../pages/leadsPage';

test.use({ storageState: 'storage/storageState.json' });

test('Lead validation errors', async ({ page }) => {
    const leadPage = new LeadPage(page);

    await leadPage.createLead('', '', '', "Web");

    await expect(page.locator('text=Review the errors')).toBeVisible();
});
import { Page } from '@playwright/test';
import { AppLauncherLocators } from '../locators/appLauncherLocators'; // <- correct path

export class AppLauncherPage {
    constructor(private page: Page) {}

    async openApp(appName: string) {
        // Use the imported object directly, not LOC
        await this.page.locator(AppLauncherLocators.appLauncherButton).click();
        await this.page.waitForTimeout(500);

        await this.page.fill(AppLauncherLocators.searchInput, appName);
        await this.page.waitForTimeout(500);

        if (appName === 'Sales') {
            await this.page.locator(AppLauncherLocators.SALES_APP_TILE_THIRD).click();
        } else {
            await this.page.locator(`(//p[@class="slds-truncate"]/b[normalize-space(text())="${appName}"])[1]`).click();
        }

        await this.page.waitForLoadState('domcontentloaded');
    }
}
// src/pages/basePage.ts
import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async click(locator: string, timeout: number = 30000) {
        const el = this.page.locator(locator);
        await el.waitFor({ state: 'visible', timeout });
        await el.click();
    }

    async type(locator: string, text: string, timeout: number = 30000) {
        const el = this.page.locator(locator);
        await el.waitFor({ state: 'visible', timeout });
        await el.fill(text);
    }

    async waitForText(text: string, timeout: number = 30000) {
        await this.page.locator(`text=${text}`).waitFor({ state: 'visible', timeout });
    }

    async getText(locator: string, timeout: number = 30000) {
        const el = this.page.locator(locator);
        await el.waitFor({ state: 'visible', timeout });
        return await el.textContent();
    }
// Common Salesforce caret dropdown
    async clickHeaderAction(actionName: string) {
        await this.page.locator('button.slds-button_icon-border-filled').first().click();
        await this.page.locator(`span:has-text("${actionName}"), a[role="menuitem"]:has-text("${actionName}")`).last().click();
    }

    // Common Salesforce Save button
    async clickSave() {
        const saveBtn = this.page.locator('button[name="SaveEdit"], button.save-btn').filter({ visible: true }).first();
        await saveBtn.click();
    }
}
import { Page } from '@playwright/test';
import { LoginLocators } from '../locators/loginLocators';

export class ManualLoginPage {
    constructor(private page: Page) {}

    async waitForPageLoad() {
        // This will now find .usernameInput without the TS2339 error
        await this.page.locator(LoginLocators.usernameInput).waitFor({
            state: 'visible',
            timeout: 15000
        });
    }

    async login(user: string, pass: string) {
        await this.page.fill(LoginLocators.usernameInput, user);
        await this.page.fill(LoginLocators.passwordInput, pass);
        await this.page.click(LoginLocators.loginBtn);
    }
}
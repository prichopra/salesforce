import { test } from '@playwright/test';
import { ENV } from '../config/env';

test('Manual login to create storageState.json', async ({ page, context }) => {
    await page.goto(ENV.loginURL);

    console.log('Please login manually...');

    await page.waitForURL('**lightning.force.com/**', {
        timeout: 120000,
    });

    await context.storageState({ path: 'storage/storageState.json' });

    console.log('storageState.json saved.');
});
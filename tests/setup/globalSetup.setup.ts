import { test as setup } from '@playwright/test';
import { STORAGE_STATE } from '../../playwright.config';

setup('accept GDPR', async ({ page }) => {
    await page.goto('https://kumo-test.com/');
    await page.getByRole('button', { name: 'Accept', exact: true }).click();
    await page.context().storageState({path: STORAGE_STATE});
    });
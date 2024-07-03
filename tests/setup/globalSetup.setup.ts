import { test as setup, expect } from '@playwright/test';

setup('accept GDPR', async ({ page }) => {
    console.log('accepting GDPR');
    await page.goto('https://kumo-test.com/');
    await page.getByRole('button', { name: 'Accept', exact: true }).click();
});
import { expect } from "@playwright/test";
import test from "./fixtures/fixture"; 

test.describe('Get metrics from entering workspaces', () => {

    test.beforeEach(async ({ page, gdprConsent }) => {
        await page.goto("https://kumo-test.com/");
        await gdprConsent.acceptButton.click();
    });

    test('Check workspaces navigation time', async ({ page }) => {
        const navigationTiming = JSON.parse(await page.evaluate(() => JSON.stringify(performance.getEntriesByType("navigation"))))[0].duration;
        console.log("Workspaces navigation duration: " + navigationTiming + " ms");
        await expect(navigationTiming).toBeLessThan(5000);
    });

    test('Resource loading time', async ({ page }) => {
        await page.goto("https://kumo-test.com/workspaces");
        const logoResourceTiming = (JSON.parse(await page.evaluate(() => JSON.stringify(window.performance.getEntriesByType('resource')))).find((element) => element.name.includes('css')));     
        console.log(logoResourceTiming);
    });
});
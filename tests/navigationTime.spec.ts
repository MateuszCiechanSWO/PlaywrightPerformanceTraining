import { expect } from "@playwright/test";
import test from "./fixtures/fixture"; 

test.describe('Check navigation time of pages', () => {

    test.beforeEach(async () => {
    });

    test('Check workspaces navigation time', async ({ page }) => {
        await page.goto("https://kumo-test.com/workspaces");
        const navigationTiming = JSON.parse(await page.evaluate(() => JSON.stringify(performance.getEntriesByType("navigation"))))[0].duration;
        console.log("Workspaces navigation duration: " + navigationTiming + " ms");
        await expect(navigationTiming).toBeLessThan(5000);
    });
});
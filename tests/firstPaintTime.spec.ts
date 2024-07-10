import { expect } from "@playwright/test";
import test from "./fixtures/fixture"; 

test.describe('Get metrics from entering workspaces', () => {

    test.beforeEach(async () => {
    });

    test('Check workspaces first paint time', async ({ page }) => {
        await page.goto("https://kumo-test.com/workspaces");
        const paintTiming = JSON.parse(await page.evaluate(() => 
            JSON.stringify(performance.getEntriesByType("paint"))));
        const firstPaintTiming: number = paintTiming[0].startTime;
        console.log(`The time to load ${paintTiming[0].name} was ${firstPaintTiming.toFixed(2)} ms`);
        await expect (firstPaintTiming).toBeLessThan(2000);
        const firstContentfulPaintTiming: number = paintTiming[1].startTime;
        console.log(`The time to load ${paintTiming[1].name} was ${firstContentfulPaintTiming.toFixed(2)} ms`);
        await expect (firstContentfulPaintTiming).toBeLessThan(2000);
    });
});
import { expect } from "@playwright/test";
import test from "./fixtures/fixture"; 

test.describe('Get metrics from entering workspaces', () => {

    test.beforeEach(async () => {
    });

    test('Check workspaces resource loading time', async ({ page }) => {
        await page.goto("https://kumo-test.com/workspaces");
        const logoResourceTiming = (JSON.parse(await page.evaluate(() => 
            JSON.stringify(performance.getEntriesByType('resource'))))
            .find((element) => element.name.includes('css')));     
        console.log(logoResourceTiming);
        await expect(logoResourceTiming.duration).toBeLessThan(2000);
    });
});
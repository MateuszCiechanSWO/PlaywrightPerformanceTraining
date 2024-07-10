import { expect } from "@playwright/test";
import test from "./fixtures/fixture"; 

test.describe('Check navigation time of pages', () => {

    test.beforeEach(async () => {
    });

    test('Check total blocking time', async ({ page }) => {
        await page.goto("https://kumo-test.com/workspaces");
        const totalBlockingTime:number = await page.evaluate(() => {
            return new Promise((resolve) => {
                let totalBlockingTime = 0;
                new PerformanceObserver(function (l) {
                    const entries = l.getEntries();
                    for (const entry of entries) {
                        totalBlockingTime += entry.duration - 50;
                    }
                    resolve(totalBlockingTime);
                })
                .observe({
                    type: 'longtask',
                    buffered: true
                });
                setTimeout(() => resolve(totalBlockingTime), 5000);
            });
        });  
        console.log("Total blocking time was " + totalBlockingTime.toFixed(2) + "ms");
    });
});
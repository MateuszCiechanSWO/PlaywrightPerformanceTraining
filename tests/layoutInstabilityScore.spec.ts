import { expect } from "@playwright/test";
import test from "./fixtures/fixture"; 

test.describe('Check navigation time of pages', () => {

    test.beforeEach(async () => {
    });

    test('Layout instability score', async ({ page }) => 
        {
            await page.goto("https://kumo-test.com/workspaces");
            const cumulativeLayoutShift = await page.evaluate(() => {
                return new Promise((resolve) => {
                    let CLS = 0;
                    new PerformanceObserver((l) => {
                        const entries = l.getEntries();
                        // the last entry is the largest contentful paint
                        entries.forEach((entry:any) => {
                            CLS += entry.value;
                        })
                        resolve(CLS);
                    })
                    .observe({
                        type: 'layout-shift',
                        buffered: true
                    });
                });
            });
            console.log("Cumulative layout shift is " + cumulativeLayoutShift + "ms");
        });
});
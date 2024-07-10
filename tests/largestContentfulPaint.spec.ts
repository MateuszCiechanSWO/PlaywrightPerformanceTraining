import { expect } from "@playwright/test";
import test from "./fixtures/fixture"; 

test.describe('Check navigation time of pages', () => {

    test.beforeEach(async () => {
    });

    test('Check workspaces largest contentful paint time', async ({ page }) => {
        await page.goto("https://kumo-test.com/workspaces");
        const largestContentfulPaint:number = await page.evaluate(() => {
            return new Promise((resolve) => {
                new PerformanceObserver((l) => {
                    const entries = l.getEntries();
                    // the last entry is the largest contentful paint
                    const largestPaintEntry = entries.at(-1);
                    resolve((largestPaintEntry as PerformanceEntry).startTime);
                })
                .observe({
                    type: 'largest-contentful-paint',
                    buffered: true
                });
            });
        });
        console.log("Largest contentful paint was rendered in " + largestContentfulPaint.toFixed(2) + "ms");
    });
});
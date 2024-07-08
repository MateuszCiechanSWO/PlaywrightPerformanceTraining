import { expect } from "@playwright/test";
import test from "./fixtures/fixture"; 

test.describe('Get metrics from entering workspaces', () => {

    test.beforeEach(async () => {
    });

    test('Check workspaces navigation time', async ({ page }) => {
        await page.goto("https://kumo-test.com/workspaces");
        const navigationTiming = JSON.parse(await page.evaluate(() => JSON.stringify(performance.getEntriesByType("navigation"))))[0].duration;
        console.log("Workspaces navigation duration: " + navigationTiming + " ms");
        await expect(navigationTiming).toBeLessThan(5000);
    });

    test('Check workspaces resource loading time', async ({ page }) => {
        await page.goto("https://kumo-test.com/workspaces");
        const logoResourceTiming = (JSON.parse(await page.evaluate(() => 
            JSON.stringify(performance.getEntriesByType('resource'))))
            .find((element) => element.name.includes('css')));     
        console.log(logoResourceTiming);
        await expect(logoResourceTiming.duration).toBeLessThan(2000);
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

    test('Layout instability score', async ({ page }) => 
    {
        await page.goto("https://kumo-test.com/workspaces");
        
        const cumulativeLayoutShift = await page.evaluate(() => {
            return new Promise((resolve) => {
                let CLS = 0;
                new PerformanceObserver((l) => {
                    const entries = l.getEntries();
                    // the last entry is the largest contentful paint
                    entries.forEach((entry) => {
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
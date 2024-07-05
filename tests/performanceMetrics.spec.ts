import test from "./fixtures/fixture";

test.describe('Get metrics from entering workspaces', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://kumo-test.com/workspaces");
    });

    test('Get performance metrics', async ({ page, leftPane }) => {
        const session = await page.context().newCDPSession(page);
        //To tell the CDPsession to record performance metrics.
        await session.send("Performance.enable");
        console.log("=============CDP Performance Metrics===============");
        await leftPane.workspacesButton.click();
        const performanceMetrics = await session.send("Performance.getMetrics");
        console.log(performanceMetrics.metrics);
    });
});
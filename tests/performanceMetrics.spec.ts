import test from "./fixtures/fixture";

test.describe('Get metrics from entering workspaces', () => {

    test.beforeEach(async ({ page, gdprConsent }) => {
        await page.goto("https://kumo-test.com/workspaces");
        await gdprConsent.acceptButton.click();
    });

    test('Get performance metrics', async ({ page, leftPane }) => {
        const session = await page.context().newCDPSession(page);
        //To tell the CDPsession to record performance metrics.
        await session.send("Performance.enable");
        console.log("=============CDP Performance Metrics===============");
        await leftPane.workspacesButton.click();
        let performanceMetrics = await session.send("Performance.getMetrics");
        console.log(performanceMetrics.metrics);
    });
});
import test from "../fixtures/fixture";

test.describe('Get metrics from entering workspaces', () => {

    test.beforeEach(async ({ page, gdprConsent }) => {
        await page.goto("https://kumo-test.com/analyse");
        await gdprConsent.acceptButton.click();
    });

    test('Get performance metrics', async ({ page, leftPane }) => {
        const session = await page.context().newCDPSession(page);
        await session.send("Performance.enable");
        //To tell the CDPsession to record performance metrics.
        console.log("=============CDP Performance Metrics===============");
        await leftPane.workspacesButton.click();
        let performanceMetrics = await session.send("Performance.getMetrics");
        console.log(performanceMetrics.metrics);
    });
});
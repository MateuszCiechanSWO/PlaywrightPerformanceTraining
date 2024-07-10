import test from "./fixtures/fixture";

test.describe("Performance marks measurement", () => {


    test("Check performance marks", async ({ page, workspaces }) => {
        await page.goto("https://kumo-test.com/workspaces");
        await page.evaluate(() => {
            window.performance.mark("perf:start");
        });
        await workspaces.createWorkspaceButton.click();
        await page.evaluate(() => {
            window.performance.mark("perf:stop");
        });
        await page.evaluate(() => {
            window.performance.measure("perf", "perf:start", "perf:stop");
        });
    });
});
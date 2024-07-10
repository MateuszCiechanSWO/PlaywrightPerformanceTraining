import { Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class Workspaces extends BasePage {
    constructor(page: any) {
        super(page, "/workspaces");
    }

    get createWorkspaceButton(): Locator {
        return this.page.getByTestId("create_workspace");
    }
}
import { Locator, Page } from "@playwright/test";

import { BasePage } from "./base-page";

export class LeftPane extends BasePage {
  constructor(page: Page) {
    super(page, "");
  }

  get dashboardButton(): Locator {
    return this.page.locator('[href="/dashboard"]');
  }

  get workspacesButton(): Locator {
    return this.page.getByTestId("Workspaces");
  }

  get analyseButton(): Locator {
    return this.page.locator('[href="/analyse"]');
  }

  get accountSettingsButton(): Locator {
    return this.page.locator('a[title="Account settings"]');
  }

  get collapseAndExpandButton(): Locator {
    return this.page.locator('button[class*="side-menu_toggleButton"]');
  }

  get leftPaneExpanded(): Locator {
    return this.page.locator("[class*=side-menu_expanded]");
  }

  get leftPaneCollapsed(): Locator {
    return this.page.locator("[class*=side-menu_collapsed]");
  }

  get cloudAccountsButton(): Locator {
    return this.page.getByTestId("Cloud accounts");
  }

  get usersButton(): Locator {
    return this.page.getByTestId("Users");
  }

  get organizationSettings(): Locator {
    return this.page.getByText("Organization Settings");
  }

  get sideMenuContentList(): Locator {
    return this.page.getByTestId("side-menu-content");
  }
}

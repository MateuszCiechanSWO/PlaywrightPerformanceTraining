import { BasePage } from "./base-page";
import { Locator, Page } from "@playwright/test";

export class GDPRConsent extends BasePage {
  constructor(page: Page) {
    super(page, "");
  }

  get modalContainer(): Locator {
    return this.page.locator("div.ku-modal-container");
  }

  get acceptButton(): Locator {
    return this.page.getByRole('button', { name: 'Accept', exact: true })

  }

  get declineButton(): Locator {
    return this.page.getByText("Decline");
  }
  
  get skipButton(): Locator {
    return this.page.getByText("Continue without acceptance");
  }

}
import { BasePage } from "./base-page";
import { Locator } from "@playwright/test";

export class GDPRConsent extends BasePage {

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
import {Locator, type Page} from "@playwright/test";

export abstract class BasePage     

{
    readonly page: Page;
    readonly url: string;

    protected constructor(page: Page, url: string) {
        this.page = page;
        this.url = url;
    }

    async navigateToURL(waitForPageLoad = false): Promise<void> 
    
    
    {
        await this.page.goto(this.url, {waitUntil: "domcontentloaded"});
        if (waitForPageLoad) {
            await this.waitForLoadEvent();
        }
    }

    async waitForLoadEvent(): Promise<void> {
        await this.page.evaluate(() => {
            return new Promise<void>((resolve) => {
                if (document.readyState === "complete") {
                    resolve();
                } else {
                    window.addEventListener('load', () => resolve(), {once: true});
                }
            });
        });
    }

    async isPseudoElementPresent(pseudoElement: string, locator: Locator): Promise<boolean> {
        await this.page.bringToFront(); // Ensure the page is in the foreground
        const parentElementHandle = await locator.elementHandle();

        if (!parentElementHandle) {
            return false;
        }

        return await this.page.evaluate(({element, pseudo}) => {
                const computedStyle = window.getComputedStyle(element as Element, pseudo);
                return computedStyle !== null;
            },
            {element: parentElementHandle, pseudo: pseudoElement},
        );
    }

    async isClassPresent(element: Locator, expectedClass: string): Promise<boolean> {
        const classText = await element.getAttribute("class");
        return !!classText?.includes(expectedClass);
    }

    async getSelectedOptionFromSelect(selectElement: Locator) {
        return await selectElement.evaluate((select: HTMLSelectElement) => {
            const selectedOption = select.selectedOptions[0];
            return selectedOption.text;
        });
    }

    async waitForLoader(loaderLocator: Locator, visibilityTimeout = 3000, detachmentTimeout = 10000): Promise<void> {
        try {
            await loaderLocator.isVisible({timeout: visibilityTimeout});
            await loaderLocator.waitFor({state: "detached", timeout: detachmentTimeout});
        } catch (err) {
            console.error(err);
        }
    }
}
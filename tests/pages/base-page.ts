import {type Page} from "@playwright/test";

export abstract class BasePage     

{
    readonly page: Page;
    readonly url: string;

    protected constructor(page: Page, url: string) {
        this.page = page;
        this.url = url;
    }
}
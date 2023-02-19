import { BasePage } from "../helpers/driver-manager";
import { Browser, Builder, By, WebDriver } from "selenium-webdriver";
import * as consts from "../consts";

export class CatalogPage extends BasePage {
    private readonly url: string;

    constructor(protected driver: WebDriver) {
        super(driver);
        this.url = consts.URL.catalog;
    }

    async openPage() {
        return await this.driver.get(this.url);
    }
}

import { BasePage } from "../helpers/driver-manager";
import { Browser, Builder, By, WebDriver } from "selenium-webdriver";
import * as consts from "../consts";

export class SearchPage extends BasePage {
    constructor(protected driver: WebDriver) {
        super(driver);
    }
    async openSearchWindowIframe() {
        await this.driver.findElement(consts.elements.searchField()).sendKeys(consts.elements.searchTextForKeys);
        return await this.driver.switchTo().frame(await this.driver.findElement(consts.elements.iframe()));
    }
}

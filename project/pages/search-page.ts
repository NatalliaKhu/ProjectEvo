import { BasePage } from "../pages/basePage";
import { Browser, Builder, By, WebDriver } from "selenium-webdriver";
import * as consts from "../consts";

export const elements = {
    searchField: () => By.className("fast-search__input"),
    searchResult: () => By.xpath("//*[@class='product__title']"),
    iframe: () => By.css("[class=modal-iframe]"),
    closeSearch: () => By.css("[class=search__close]"),
    searchedItem: () => By.id("product-sub-navigation-container"),
};
export class SearchPage extends BasePage {
    constructor(protected driver: WebDriver) {
        super(driver);
    }
    async openSearchWindowIframe() {
        await this.driver.findElement(elements.searchField()).sendKeys(consts.text.searchTextForKeys);
        return await this.driver.switchTo().frame(await this.driver.findElement(elements.iframe()));
    }
}

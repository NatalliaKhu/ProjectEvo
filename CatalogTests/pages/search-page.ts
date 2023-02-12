import { BasePage } from "../helpers/driver-manager";
import { Browser, Builder, By, WebDriver } from "selenium-webdriver";

export const elements = {
    searchField: () => By.className("fast-search__input"),
    searchResult: () => By.xpath("//*[@class='product__title']"),
    iframe: () => By.css("[class=modal-iframe]"),
    closeSearch: () => By.css("[class=search__close]"),
    searchedItem: () => By.id("product-sub-navigation-container"),
    searchTextForKeys: "Телевизор",
};

export class SearchPage extends BasePage {
    constructor(protected driver: WebDriver) {
        super(driver);
    }
    async openSearchWindowIframe() {
        await this.driver.findElement(elements.searchField()).sendKeys(elements.searchTextForKeys);
        return await this.driver.switchTo().frame(await this.driver.findElement(elements.iframe()));
    }
}

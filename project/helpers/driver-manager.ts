import { Browser, Builder, By, WebDriver } from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";
import { path } from "chromedriver";

export class BasePage {
    constructor(protected driver: WebDriver) {}

    async openCatalogPage() {
        const service = new chrome.ServiceBuilder(path);
        this.driver = await new Builder().forBrowser(Browser.CHROME).setChromeService(service).build();
        await this.driver.manage().setTimeouts({ implicit: 10000 });
        await this.driver.manage().window().maximize();
        return await this.driver.get("https://catalog.onliner.by/");
    }

    async closeBrowser() {
        return await this.driver.quit();
    }
}

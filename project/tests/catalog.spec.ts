import { Browser, Builder, By, WebDriver } from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";
import { path } from "chromedriver";
import { BasePage } from "../helpers/driver-manager";
import { SearchPage } from "../pages/search-page";
import * as consts from "../consts";

describe("Catalog Onliner", () => {
    let driver: WebDriver;
    beforeEach(async () => {
        //await new BasePage(driver).openCatalogPage();
        const service = new chrome.ServiceBuilder(path);
        driver = new Builder().forBrowser(Browser.CHROME).setChromeService(service).build();
        await driver.manage().setTimeouts({ implicit: 10000 });
        await driver.manage().window().maximize();
        await driver.get(consts.URL.catalog);
    }, 15000);

    afterEach(async () => {
        await new BasePage(driver).closeBrowser();
    }, 15000);

    test("'Наушники и гарнитуры' section is open", async () => {
        await driver.findElement(consts.elements.headphonesLink()).click();
        expect(driver.findElement(consts.elements.headphonesTitle())).toBeTruthy;
    }, 15000);

    test("Click on 'Каталог' opens main catalog page", async () => {
        await driver.findElement(consts.elements.headphonesLink()).click();
        await driver.findElement(consts.elements.catalogLink()).click();
        const currentUrl = await driver.getCurrentUrl();
        expect(consts.URL.catalog).toEqual(currentUrl);
    }),
        15000;

    test("Make search", async () => {
        await new SearchPage(driver).openSearchWindowIframe();
        expect(await driver.findElement(consts.elements.searchResult()).getText()).toContain(
            consts.elements.searchTextForKeys,
        );
    }, 15000);

    test("Make search and open item page", async () => {
        await new SearchPage(driver).openSearchWindowIframe();
        await driver.findElement(consts.elements.searchResult()).click();
        expect(await driver.findElement(consts.elements.searchedItem())).toBeTruthy;
    }, 15000);
});

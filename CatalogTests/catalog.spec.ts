import { Browser, Builder, By, WebDriver } from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";
import { path } from "chromedriver";
import { BasePage } from "./helpers/driver-manager";
import { URL } from "./helpers/urls";
import * as pages from "./pages";
import { CatalogPage } from "./pages/catalog-page";
import { SearchPage } from "./pages/search-page";
import { text } from "./helpers/texts";
import { time } from "console";

describe("Catalog Onliner", () => {
    let driver: WebDriver;
    beforeEach(async () => {
        //await new BasePage(driver).openCatalogPage();
        const service = new chrome.ServiceBuilder(path);
        driver = await new Builder().forBrowser(Browser.CHROME).setChromeService(service).build();
        await driver.manage().setTimeouts({ implicit: 10000 });
        await driver.manage().window().maximize();
        await driver.get("https://catalog.onliner.by/");
    });

    afterEach(async () => {
        await new BasePage(driver).closeBrowser();
    });

    test("'Наушники и гарнитуры' section is open", async () => {
        await driver.findElement(pages.catalog.elements.headphonesLink()).click();
        expect(await driver.findElement(pages.catalog.elements.headphonesTitle())).toBeTruthy;
    });

    test("Click on 'Каталог' opens main catalog page", async () => {
        await driver.findElement(pages.catalog.elements.headphonesLink()).click();
        await driver.findElement(pages.catalog.elements.catalogLink()).click();
        const currentUrl = await driver.getCurrentUrl();
        expect("https://catalog.onliner.by/").toEqual(currentUrl);
    });

    test("Make search", async () => {
        await new SearchPage(driver).openSearchWindowIframe();
        expect(await driver.findElement(pages.search.elements.searchResult()).getText()).toContain(
            pages.search.elements.searchTextForKeys,
        );
    });

    test("Make search and open item page", async () => {
        await new SearchPage(driver).openSearchWindowIframe();
        await driver.findElement(pages.search.elements.searchResult()).click();
        expect(await driver.findElement(pages.search.elements.searchedItem())).toBeTruthy;
    });
});
async function func() {}

func();

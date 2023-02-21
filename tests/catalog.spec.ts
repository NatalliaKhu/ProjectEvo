import { WebDriver } from "selenium-webdriver";
import { DriverManager } from "../helpers/driver-manager";
import { SearchPage } from "../pages/search-page";
import * as consts from "../consts";
import { BasePage } from "../pages/basePage";
import * as catalog from "../pages/catalog-page";
import * as search from "../pages/search-page";

describe("Catalog Onliner", () => {
  const driverManager: DriverManager = new DriverManager();
  let driver: WebDriver;
  let basePage: BasePage;

  beforeAll(async () => {
    driver = await driverManager.createDriver();
    basePage = new BasePage(driver);
  });

  beforeEach(async () => {
    await basePage.openCatalogPage();
  }, 15000);

  afterEach(async () => {
    await driverManager.openNewTab();
    await driverManager.switchToTab(0);
    await driverManager.closeActiveTab();
    await driverManager.switchToTab(0);
  }, 15000);

  afterAll(async () => {
    await driverManager.quitBrowser();
  });

  test("'Наушники и гарнитуры' section is open", async () => {
    await driver.findElement(catalog.elements.headphonesLink()).click();
    expect(driver.findElement(catalog.elements.headphonesTitle())).toBeTruthy;
  }, 15000);

  test("Click on 'Каталог' opens main catalog page", async () => {
    await driver.findElement(catalog.elements.headphonesLink()).click();
    await driver.findElement(catalog.elements.catalogLink()).click();
    const currentUrl: string = await driver.getCurrentUrl();
    expect(consts.URL.catalog).toEqual(currentUrl);
  }),
    15000;

  test("Make search", async () => {
    await new SearchPage(driver).openSearchWindowIframe();
    expect(
      await driver.findElement(search.elements.searchResult()).getText()
    ).toContain(consts.text.searchTextForKeys);
  }, 15000);

  test("Make search and open item page", async () => {
    await new SearchPage(driver).openSearchWindowIframe();
    await driver.findElement(search.elements.searchResult()).click();
    expect(await driver.findElement(search.elements.searchedItem())).toBeTruthy;
  }, 15000);
});

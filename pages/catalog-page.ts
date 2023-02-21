import { BasePage } from "../pages/basePage";
import { By, WebDriver } from "selenium-webdriver";
import * as consts from "../consts";

export const elements = {
  headphonesLink: () =>
    By.xpath("//li/a[contains(text(), 'Наушники и гарнитуры')]"),
  headphonesTitle: () =>
    By.xpath("//h1[contains(text(), 'Наушники и гарнитуры')]"),
  catalogLink: () => By.className("b-main-navigation__text"),
};

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

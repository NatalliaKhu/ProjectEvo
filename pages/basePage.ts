import { WebDriver } from "selenium-webdriver";
import * as consts from "../consts";

export class BasePage {
  protected driver: WebDriver;
  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  async openCatalogPage() {
    return await this.driver.get(consts.URL.catalog);
  }
}

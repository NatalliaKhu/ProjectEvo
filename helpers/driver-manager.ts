import { Browser, Builder, WebDriver } from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";
import { path } from "chromedriver";

export class DriverManager {
  private driver: WebDriver;

  async createDriver() {
    const service = new chrome.ServiceBuilder(path);
    this.driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeService(service)
      .build();
    await this.driver.manage().setTimeouts({ implicit: 10000 });
    await this.driver.manage().window().maximize();
    return this.driver;
  }

  async openNewTab() {
    return await this.driver.switchTo().newWindow("tab");
  }

  async switchToTab() {
    const originalWindow: string = await this.driver.getWindowHandle();
    const windows: string[] = await this.driver.getAllWindowHandles();
    windows.forEach(async (handle) => {
      if (handle !== originalWindow) {
        await this.driver.switchTo().window(handle);
      }
    });
  }

  async closeActiveTab() {
    return await this.driver.close();
  }

  async quitBrowser() {
    return await this.driver.quit();
  }
}

import { By } from "selenium-webdriver";

export const URL = {
    catalog: "https://catalog.onliner.by/",
};

export const elements = {
    searchField: () => By.className("fast-search__input"),
    searchResult: () => By.xpath("//*[@class='product__title']"),
    iframe: () => By.css("[class=modal-iframe]"),
    closeSearch: () => By.css("[class=search__close]"),
    searchedItem: () => By.id("product-sub-navigation-container"),
    searchTextForKeys: "Телевизор",
    headphonesLink: () => By.xpath("//li/a[contains(text(), 'Наушники и гарнитуры')]"),
    headphonesTitle: () => By.xpath("//h1[contains(text(), 'Наушники и гарнитуры')]"),
    catalogLink: () => By.className("b-main-navigation__text"),
};

export const text = {
    searchText: "Телевизор",
};

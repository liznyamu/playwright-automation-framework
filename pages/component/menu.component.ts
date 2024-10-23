import {Page, Locator} from '@playwright/test';

class MenuComponent{
    page: Page;
    blogMenu: Locator;

    constructor(page: Page){
        this.page = page;
        this.blogMenu = page.locator('nav#primary-menu [href*="/blog/"]');
    }
}

export default MenuComponent;

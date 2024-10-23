import { Page, Locator } from '@playwright/test';
class HomePage {
    private page: Page;
    getStartedBtn: Locator;
    headingTxt: Locator;
    homeLink: Locator;
    searchIcon: Locator;
    navLinks: Locator;
    navLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.getStartedBtn = page.locator("#get-started");
        this.headingTxt = page.getByText('Think different. Make different.');
        // this.homeLink = page.locator('#zak-primary-menu:has-text("Home")');
        this.homeLink = page.locator('#zak-primary-menu .menu-item-home')
        this.searchIcon = page.locator('//*[contains(@class, "zak-header-actions--desktop")]//*[@class="zak-header-search__toggle"]');
        this.navLinks = page.locator('#zak-primary-menu li[id*=menu-item]');
        this.navLink = page.locator('#zak-primary-menu li[id*=menu-item]').nth(3);
    }

    getNavLinksText() {
        return this.navLinks.allTextContents();
    }

    async navigate() {
        await this.page.goto('/');
    }

}

export default HomePage;
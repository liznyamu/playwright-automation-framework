import { test, expect } from "@playwright/test";
import HomePage from "../pages/home.page";

test.describe('Home', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        // initialize homepage
        homePage = new HomePage(page);

        //open url
        // await page.goto("https://practice.sdetunicorns.com/");
        await homePage.navigate();
    })

    test.use({ storageState: 'notLoggedInState.json' })
    
    test('Open Home page and verify title', async ({ page }) => {
        //verify title 
        await expect(page).toHaveTitle("Practice E-Commerce Site – SDET Unicorns");
    })

    test.skip('Open AboutUsPage and verify title', async ({ page }) => {
        // open about-us url
        await page.goto("https://practice.sdetunicorns.com/about/");

        // verify title
        await expect(page).toHaveTitle("About – Practice E-Commerce Site");
    })

    test('Click get started button using CSS selector', async ({ page }) => {

        // verify title does not contain #get-started
        await expect(page).not.toHaveURL(/.*#get-started/);

        // click the button
        // await page.locator("#get-started").click();
        await homePage.getStartedBtn.click();

        // verify title contains #get-started
        await expect(page).toHaveURL(/.*#get-started/);
    })

    test('Verify heading text is visible using Text Selector', async () => {
        // // find the text locator
        // const headingText = page.locator('text=Think different. Make different.');

        // // verify heading text is visible
        // await expect(headingText).toBeVisible();

        // find the text locator
        // const headingText2 = page.getByText('Think different. Make different.');
        const headingText2 = homePage.headingTxt;

        // verify heading text is visible
        await expect(headingText2).toBeVisible();
        // await expect(headingText2).not.toBeHidden();

    })
    test('Verify home link is enabled using text and css selector', async () => {
        // find the text locator
        // const homeText = page.locator('#primary-menu >> text=Home');
        // const homeText = page.locator('#primary-menu:has-text("Home")');
        const homeText = homePage.homeLink;

        // verify heading text is visible
        await expect(homeText).toBeEnabled();
    })

    test('Verify search icon is visble using Xpath locator', async () => {
        // find the search icon locator
        // const searchIcon = page.locator('//*[@class=“zak-header-actions zak-header-actions--desktop”]//*[@class=“zak-header-search__toggle”]');
        // const searchIcon = page.locator('//div[@class=“zak-header-actions zak-header-actions--desktop”]//a[@class=“zak-header-search__toggle”]');
        // const searchIcon = page.locator('//*[contains(@class, "zak-header-actions--desktop")]//*[@class="zak-header-search__toggle"]');
        const searchIcon = homePage.searchIcon;

        // verify search icon is visible
        await expect(searchIcon).toBeVisible();
    })

    test('Verify text of all nav links', async () => {
        const navLinkText = ["Home", "About", "Shop", "Blog", "Contact", "My account"];
        // find all the nav links locator
        // const navLinks = page.locator('#primary-menu li[id*=menu-item]');
        const navLinks = homePage.navLinks;

        // verify search icon is visible
        expect(await navLinks.allTextContents()).toEqual(navLinkText);
    })

    test('Verify text of all nav links - using HomePage.getNavLinksText()', async () => {
        const navLinkText = ["Home", "About", "Shop", "Blog", "Contact", "My account"];

        // verify search icon is visible
        expect(await homePage.getNavLinksText()).toEqual(navLinkText);
    })

    test('Verify text of one nav links - nth(<index>) , first(), last()', async () => {
        const expectedLinkText = ["Home", "About", "Shop", "Blog", "Contact", "My account"];

        // find all the nav links locator - use nth-element
        // const navLink = page.locator('#primary-menu li[id*=menu-item]').nth(3);
        const navLink = homePage.navLink;

        // verify search icon is visible
        // expect(await navLink.textContent()).toEqual(expectedLinkText[3]);
        await expect(navLink).toHaveText(expectedLinkText[3]);
    })

    // eslint-disable-next-line playwright/expect-expect
    test('Verify text of all nav links - loop', async () => {
        // find all the nav links locator
        // const navLinks = page.locator('#primary-menu li[id*=menu-item]');
        const navLinks = homePage.navLinks;

        // loop and log the textContent
        for (const element of await navLinks.elementHandles()) {
            console.log(await element.textContent());
        }

    })
})

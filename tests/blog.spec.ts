import { test, expect } from '@playwright/test';
import BlogPage from '../pages/blog.page';

test.describe('Blog', () => {
    let blogPage: BlogPage;
    test('Verify Recent Posts count and verify the length of each list item', async ({ page }) => {
        blogPage = new BlogPage(page);

        // open blog page 
        await blogPage.navigate();
        // await blogPage.menuComponent().blogMenu.click()
        // await expect(page).toHaveURL(/.*blog\//);


        // get the recent post list elements
        const recentPosts = blogPage.recentPosts;
        await expect(recentPosts.first()).toBeVisible();

        // assertion 1 : get the length of no. of posts
        // expect(await recentPosts.count()).toEqual(5);
        await expect(recentPosts).toHaveCount(5);


        // assertion 2 : expect min char length of each individual post item > 10
        for (const el of await recentPosts.allTextContents()) {
            expect(el.trim().length).toBeGreaterThan(10)
        }

        for (const el of await recentPosts.elementHandles()) {
            expect((await el.textContent())!.trim().length).toBeGreaterThan(10)
        }

    })

})


import { Page, Locator } from '@playwright/test';
import MenuComponent from './component/menu.component';

class BlogPage {
    page: Page;
    recentPosts: Locator;
    constructor(page: Page) {
        this.page = page;
        this.recentPosts = page.locator('#zak-secondary [id^=recent-posts] li');
    }

    menuComponent() {
        return new MenuComponent(this.page);
    }

    async navigate() {
        await this.page.goto('/blog');
    }

}

export default BlogPage;
import { Page, Locator } from '@playwright/test';
class ContactPage {
    private page: Page;
    nameFld: Locator;
    emailFld: Locator;
    phoneFld: Locator;
    messageTxtArea: Locator;
    submitBtn: Locator;
    successAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameFld = page.locator('.contact-name input');
        this.emailFld = page.locator('.contact-email input');
        this.phoneFld = page.locator('.contact-phone input');
        this.messageTxtArea = page.locator('.contact-message textarea');
        this.submitBtn = page.getByRole('button').filter({ hasText: 'submit' });
        this.successAlert = page.locator('.everest-forms-notice');
    }

    async navigate() {
        await this.page.goto('https://practice.sdetunicorns.com/contact/');
    }

    async submitForm({name, email, phone, message}) {
        await this.nameFld.fill(name);
        await this.emailFld.fill(email);
        await this.phoneFld.fill(phone);
        await this.messageTxtArea.fill(message);
        await this.submitBtn.click();
    }

    getSuccessAlertText() {
        return this.successAlert.textContent();
    }

}

export default ContactPage;
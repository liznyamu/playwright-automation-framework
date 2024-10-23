import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import ContactPage from '../pages/contact.page';

test.describe('Contact', () => {
    let contactPage: ContactPage;

    test.beforeEach(async ({ page }) => {
        contactPage = new ContactPage(page);
        // open contact page
        await contactPage.navigate();
    })

    test('Fill contact form and verify success message', async () => {


        // fill the contact us form - using random data to increase test coverage using dynamic data PLUS find edge cases
        await contactPage.submitForm({
            name: faker.person.firstName(),
            email: faker.internet.email(),
            phone: faker.phone.number({ style: 'international' }),
            message: faker.lorem.paragraphs(2)
        });

        // assert the success message 
        // const successAlert = page.locator('div[role="alert"]');      
        expect(await contactPage.getSuccessAlertText()).toContain('Thanks for contacting us! We will be in touch with you shortly');
        expect(await contactPage.getSuccessAlertText()).toMatch(/Thanks for contacting us.*/);

    })

    test('Fill contact form and verify success message with soft assert', async () => {
        // fill the contact us form
        await contactPage.nameFld.fill(faker.person.fullName());
        await contactPage.emailFld.fill(faker.internet.exampleEmail());
        await contactPage.phoneFld.fill(faker.phone.imei());
        await contactPage.messageTxtArea.fill(faker.lorem.sentences());

        // adding a soft assertion
        // expect.soft(page.locator('.contact-message textarea')).toHaveText('fail soft assertion');

        // submit the form
        // await page.locator('[name="everest_forms[submit]"]').click(); 
        // await page.locator('button[type=submit]').click(); 
        await contactPage.submitBtn.click();

        // Avoid running further if there were soft assertion failures.
        // expect(test.info().errors).toHaveLength(0);


        // assert the success message 
        // const successAlert = page.locator('div[role="alert"]');      
        expect(await contactPage.getSuccessAlertText()).toContain('Thanks for contacting us! We will be in touch with you shortly');
        expect(await contactPage.getSuccessAlertText()).toMatch(/Thanks for contacting us.*/);

    })

})

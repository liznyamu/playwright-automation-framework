import { test, expect, APIRequestContext, APIResponse } from '@playwright/test';
import { faker } from '@faker-js/faker';
import ContactPage from '../pages/contact.page';
import apiController from '../controller/api.controller';

test.describe('Contact - Api tests within UI tests', () => {
    let contactPage: ContactPage;
    let randomPerson: APIResponse;
    // let fakerApi: APIRequestContext;

    test.beforeAll(async () => {
        /*
        // create the API context
        fakerApi = await playwright.request.newContext({
            baseURL: 'https://jsonplaceholder.typicode.com/'
        });

        // GET /users 
        const response = await fakerApi.get('users');
        const responseBody = await response.json();
        randomPerson = responseBody[0]; // Random person - responseBody[Math.floor(Math.random()*responseBody.length)];
        

        // POST /users/1/todos
        const postResponse = await fakerApi.post('users/1/todos', {
            data: {
                "title": faker.music.songName(),
                "completed": "false"
            }
        });
       const postResponseBody =  await postResponse.json();
       console.log(postResponseBody);
       */

        // create the API context
        await apiController.init();

        // GET /users
        randomPerson = await apiController.getUsers();

        // POST /users/1/todos
        const newTodo = {
                        "title": faker.music.songName(),
                        "completed": faker.datatype.boolean({ probability: 0.5 })
                    };
        const newUserTodo = await apiController.createUserTodo(newTodo)
        console.log(newUserTodo);

    })


    test.beforeEach(async ({ page }) => {
        contactPage = new ContactPage(page);
        // open contact page
        await contactPage.navigate();
    })

    test('Fill contact form and verify success message', async () => {


        // fill the contact us form - using random data to from actual API (or 'real' data)
        await contactPage.submitForm({
            name: randomPerson['name'],
            email: randomPerson['email'],
            phone: randomPerson['phone'],
            message: randomPerson['company']['catchPhrase']
        });

        // assert the success message 
        // const successAlert = page.locator('div[role="alert"]');      
        expect(await contactPage.getSuccessAlertText()).toContain('Thanks for contacting us! We will be in touch with you shortly');
        expect(await contactPage.getSuccessAlertText()).toMatch(/Thanks for contacting us.*/);

    })

    test('Fill contact form and verify success message with soft assert', async () => {
        // fill the contact us form - using random synthetic data to increase test coverage using dynamic data PLUS find edge cases
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

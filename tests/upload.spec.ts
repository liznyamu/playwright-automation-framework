import { test, expect } from '@playwright/test';
import CartPage from '../pages/cart.page';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

test.describe('Upload File', () => {
    let cartPage: CartPage;
    const fileNames = ['3-mb.pdf', 'cat-image.png'];

    test.beforeEach(async ({ page }) => {
        cartPage = new CartPage(page);

        // open url
        // await page.goto("https://practice.sdetunicorns.com/cart/");
        await cartPage.navigate();

    })


    for (const fileName of fileNames) {
        test(`when file input field is accessible/not hidden, then regular upload - should upload a test file : ${fileName}`, async () => {


            // provide test file path
            const filePath = path.join(__dirname, `../data/${fileName}`);

            // // upload test file  --> on <input type="file" ...>
            // await page.setInputFiles('input#upfile_1', filePath);

            // // click the submit button - click upload button
            // await page.locator('#upload_1').click();

            // upload test file 
            await cartPage.uploadComponent().uploadFile(filePath);

            // wait for condition
            await cartPage.uploadComponent().successTxt.waitFor({ state: 'visible', timeout: 10 * 1000 });

            // add assertion with assertion wait
            await expect(cartPage.uploadComponent().successTxt).toHaveText(/.*File.*uploaded successfully/, { timeout: 10 * 1000 });
            await expect(cartPage.uploadComponent().successTxt).toContainText('uploaded successfully', { timeout: 10 * 1000 });
        })
    }


    test('when file input field is hidden, then using upload with DOM manipulation - should upload a test file', async () => {

        // provide test file path
        // const filePath = path.join(__dirname, '../data/cat-image.png');
        const filePath = path.join(__dirname, '../data/3-mb.pdf'); // needs a wait to finish upload

        // DOM Manipulation - to make the file input element visible on DOM
        //  - fail the test to see below upload button made visible on DOM
        // await page.evaluate(() => {
        //     const selector = document.querySelector('input#upfile_1');
        //     // const selector = document.querySelector(uploadInput);
        //     if (selector) {
        //         selector.className = '';
        //     }
        // })

        cartPage.uploadComponent().makeFileInputVisibleOnDom();

        // // upload test file  --> on <input type="file" ...>
        // await page.setInputFiles('input#upfile_1', filePath);

        // // click the submit button - click upload button
        // await page.locator('#upload_1').click();

        // upload test file 
        await cartPage.uploadComponent().uploadFile(filePath);

        // Wait - Option 1/3 : hardcoded sleep - WRONG WAY
        // await page.waitForTimeout();

        // Wait - Option 2/3 : wait for condition - Recommended WAY 
        // await page.locator('#wfu_messageblock_header_1_1').waitFor();
        // await page.locator('#wfu_messageblock_header_1_1').waitFor({state: 'visible', timeout: 10000});

        // add assertion
        // await expect(page.locator('#wfu_messageblock_header_1_1')).toHaveText(/.*File.*uploaded successfully/);
        // await expect(page.locator('#wfu_messageblock_header_1_1')).toContainText('uploaded successfully');

        // Wait - Option 3/3 : Assertion wait - Another Recommended WAY
        // await expect(page.locator('#wfu_messageblock_header_1_1')).toHaveText(/.*File.*uploaded successfully/, { timeout: 10000 });
        // await expect(page.locator('#wfu_messageblock_header_1_1')).toContainText('uploaded successfully', { timeout: 10000 });
        await expect(cartPage.uploadComponent().successTxt).toHaveText(/.*File.*uploaded successfully/, { timeout: 10000 });
        await expect(cartPage.uploadComponent().successTxt).toContainText('uploaded successfully', { timeout: 10000 });


    })


})

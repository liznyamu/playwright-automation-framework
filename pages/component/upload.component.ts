import { Page, Locator } from '@playwright/test';

class UploadComponent {
    private page: Page;
    uploadInput: string;
    submitBtn: Locator;
    successTxt: Locator;

    constructor(page: Page) {
        this.page = page;
        this.uploadInput = 'input#upfile_1';
        this.submitBtn = page.locator('#upload_1');
        this.successTxt = page.locator('#wfu_messageblock_header_1_1');
    }

    async uploadFile(filePath: string) {
        // upload test file  --> on <input type="file" ...>
        await this.page.setInputFiles(this.uploadInput, filePath);

        // click the submit button - click upload button
        await this.submitBtn.click();
    }

    async makeFileInputVisibleOnDom() {
        await this.page.evaluate(() => {
            // TODO: check why this fails with this.uploadInput
            const selector = document.querySelector('input#upfile_1');
            // const selector = document.querySelector(this.uploadInput);
            if (selector) {
                selector.className = '';
            }
        })
    }
}

export default UploadComponent;
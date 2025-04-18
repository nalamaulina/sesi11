const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('SauceDemo - Filter Z to A', function () {
    let driver;

    it('Login dan filter produk dari Z ke A', async function () {
        
        driver = await new Builder().forBrowser('chrome').build();

        console.log("Buka halaman login...");
      
        await driver.get('https://www.saucedemo.com');
        
        const title = await driver.getTitle();
        assert.strictEqual(title, 'Swag Labs');
        
        console.log("Isi username dan password...");
      
        let inputUsername = await driver.findElement(By.css('[data-test="username"]'));
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'));
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'));
        await inputUsername.sendKeys('standard_user');
        await inputPassword.sendKeys('secret_sauce');
        await buttonLogin.click();
        
        console.log("Tunggu halaman inventory terbuka...");
        await driver.wait(until.urlContains('inventory.html'), 10000);

        console.log("Login sukses, cek logo aplikasi...");
        let textAppLogo = await driver.findElement(By.className('app_logo'));
        let logotext = await textAppLogo.getText();
        assert.strictEqual(logotext, 'Swag Labs');

        console.log("Cari dropdown filter...");
        let buttonCart = await driver.wait(
            until.elementLocated(By.xpath('//*[@data-test="shopping-cart-link"]')),
            10000
        );
        await buttonCart.isDisplayed();
        
        console.log("Cari dropdown filter...");
        let filterDropdown = await driver.wait(
            until.elementLocated(By.css('select[data-test="product-sort-container"]')),
            10000
        );

        await filterDropdown.click();
        await filterDropdown.findElement(By.css('option[value="za"]')).click();

        await driver.wait(until.elementsLocated(By.className('inventory_item_name')), 5000);

        let nameElements = await driver.findElements(By.className('inventory_item_name'));
        let names = [];
        for (let nameElement of nameElements) {
            let name = await nameElement.getText();
            names.push(name);
        }

        console.log("Produk setelah filter Z to A:", names);

        await driver.sleep(3000);

        await driver.quit();
    });
});

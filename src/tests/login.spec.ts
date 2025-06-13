import { test } from '@playwright/test'
import { LoginPage } from '../../pages/loginPage.ts';
import * as config from '../../config.json';

let loginPage: LoginPage;

test('successful login test', async() => {
    //let loginPage: LoginPage;

    const email = config.email!;
    const password = config.password!;
    loginPage = await LoginPage.initialize();
    await loginPage.fillEmailAddress(email);
    await loginPage.fillPassword(password);
    await loginPage.clickLogin();
    await loginPage.verifyHomePageIsOpened();   
});

test('enter invalid email test', async() => {
    //let loginPage: LoginPage;

    const email = config.invalidEmail!;
    const password = config.invalidPassword!;
    loginPage = await LoginPage.initialize();
    await loginPage.fillEmailAddress(email);
    await loginPage.fillPassword(password);
    await loginPage.clickLogin();
    await loginPage.verifyInvalidEmailErrorPopupIsVisible();
});

test.afterEach(async() => {
    await loginPage.closeBrowser();
});
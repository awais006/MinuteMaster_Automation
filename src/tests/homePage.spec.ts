import { test } from '@playwright/test'
import { LoginPage } from '../../pages/loginPage.ts';
import { HomePage } from '../../pages/homePage.ts';
import * as config from '../../config.json';


let loginPage: LoginPage;

test.beforeEach(async () => {
    const email = config.email!;
    const password = config.password!;
    loginPage = await LoginPage.initialize();
    await loginPage.login(email, password);
});

test('create new Bookcase', async() => {
const homePage = await new HomePage(loginPage.getPage());

const name =`QA Test ${new Date().toISOString()}`;
await homePage.CreateNewBookCase(name);   
});

test('create already existing Bookcase', async() => {
const homePage = await new HomePage(loginPage.getPage());

const name ='Test 1';
await homePage.VerifyBookCaseWithSameCannotBeCreated(name);   
});

test.afterEach(async () => {
    await loginPage.closeBrowser();
});

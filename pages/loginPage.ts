import { Page, Locator, chromium, expect } from '@playwright/test';
import * as config from '../config.json';

export class LoginPage {
  private page: Page;
  private userEmail: Locator;
  private continueButton: Locator;
  private password: Locator;
  private loginButton: Locator;
  private invalidEmailPopup: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userEmail = this.page.locator('//input[@id="email"]');
    this.password = this.page.locator('//input[@id="password"]');
    this.loginButton = this.page.locator('//button[@id="login-button"]');
    this.invalidEmailPopup = this.page.locator('//div[@role="alert"]');
  }

  public static async initialize(): Promise<LoginPage> {
    const browser = await chromium.launch({ headless: false});
    const page = await browser.newPage();
    await page.goto(config.baseUrl);
    return new LoginPage(page);
  }
  
  public async login(email: string, password: string): Promise<void> {
    await this.userEmail.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL('**/bookcase');
    await this.page.locator('input[placeholder="Search for Packs"]');
  }

  public async fillEmailAddress(email: string): Promise<void> {
    await this.userEmail.fill(email);
  }
  
  public async fillPassword(password: string): Promise<void> {
    await this.password.fill(password);
  }

  public async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  public async verifyInvalidEmailErrorPopupIsVisible() {
    await expect(this.invalidEmailPopup, "Invalid Email Popup is not visible on Sign in page when Invalid credentials are entered").toBeVisible();
  }

  public async verifyHomePageIsOpened() {
    await this.page.waitForURL('**/bookcase');
    await expect(this.page.locator('input[placeholder="Search for Packs"]'), "Home page heading is not present.").toBeVisible();
  }

  public getPage(): Page {
    return this.page;
  }

  public async closeBrowser(): Promise<void> {
    await this.page.context().browser()?.close();
  }
}
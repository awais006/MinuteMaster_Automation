import { Page, expect } from '@playwright/test';

export class HomePage {
  private page: Page;
  private createNewBookCaseBtn: string;
  private enterBookCaseNamePopupTextBox: string;
  private enterBookCaseNamePopupBtn: string;
  private successAlert: string;
  private bookcaseAlreadyExistsAlert: string;
  
  constructor(page: Page) {
    this.page = page;
    this.createNewBookCaseBtn = "//button[text()='Create New Bookcase']";
    this.enterBookCaseNamePopupTextBox = "//input[@id='bookcaseName']";
    this.enterBookCaseNamePopupBtn = "//div[contains(@class, 'MuiDialog-container')]//button[text()='Create New Bookcase']";
    this.successAlert = "//div[@role='alert' and contains(text(), 'Bookcase added successfully')]";
    this.bookcaseAlreadyExistsAlert = "//div[@role='alert' and contains(text(), 'Bookcase name already exists')]";
  }

  public async CreateNewBookCase(name: string) {
    await this.page.locator(this.createNewBookCaseBtn).click();
    await this.page.locator(this.enterBookCaseNamePopupTextBox).fill(name);
    await this.page.locator(this.enterBookCaseNamePopupBtn).click();
    await expect(this.page.locator(this.successAlert), `Bookcase with name ${name} is not created.`).toBeVisible();
  }

  public async VerifyBookCaseWithSameCannotBeCreated(name: string) {
    await this.page.locator(this.createNewBookCaseBtn).click();
    await this.page.locator(this.enterBookCaseNamePopupTextBox).fill(name);
    await this.page.locator(this.enterBookCaseNamePopupBtn).click();
    await expect(this.page.locator(this.bookcaseAlreadyExistsAlert), `Bookcase with name ${name} is created.`).toBeVisible();
  }

  public async VerifyTagsUnderTaskInsideTheProject(column: string, project: string, task:string, tags:string[]) {

  }

  public async OpenProjectFromSidebar(project: string) {

  }

  public async NormalizeColumnName(column:string) {

  } 

}
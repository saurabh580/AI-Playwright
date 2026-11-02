import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly submit: Locator;
  readonly error: Locator;
  readonly successHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('input#username');
    this.password = page.locator('input#password');
    this.submit = page.locator('button#submit');
    this.error = page.locator('#error');
    this.successHeader = page.locator('h1');
  }

  async goto() {
    await this.page.goto('https://practicetestautomation.com/practice-test-login/');
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submit.click();
  }

  async assertLoginSuccess() {
    await expect(this.successHeader).toContainText('Logged In Successfully');
  }

  async assertLoginFailed() {
    await expect(this.error).toBeVisible();
  }
}

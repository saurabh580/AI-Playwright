import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchBtn: Locator;
  readonly products: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#search_product');
    this.searchBtn = page.locator('#submit_search');
    this.products = page.locator('.product-image-wrapper');
  }

  async goto() {
    await this.page.goto('https://automationexercise.com/products');
  }

  async search(product: string) {
    await this.searchInput.fill(product);
    await this.searchBtn.click();
  }

  async addFirstProductToCart() {
    const first = this.products.first();
    await first.hover();
    await first.locator('a:has-text("Add to cart")').first().click();
    await this.page.click('button:has-text("Continue Shopping")');
  }

  async verifyResultsContain(text: string) {
    await expect(this.page.locator('.features_items')).toContainText(text, { ignoreCase: true });
  }
}

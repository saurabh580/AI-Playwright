import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

test.describe('E-commerce Search with POM @regression', () => {
  test('Search T-Shirts and verify', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.goto();
    await productPage.search('T-Shirt');
    await productPage.verifyResultsContain('T-Shirt');
    const count = await productPage.products.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Add product to cart using POM', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.goto();
    await productPage.addFirstProductToCart();
    await page.click('a[href="/view_cart"]');
    await expect(page.locator('#cart_info')).toBeVisible();
  });
});

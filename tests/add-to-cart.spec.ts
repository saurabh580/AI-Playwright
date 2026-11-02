import { test, expect } from '@playwright/test';

test.describe('Add to Cart @smoke', () => {
  test('Add 2 products and verify cart', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');
    for (let i = 0; i < 2; i++) {
      const p = page.locator('.product-image-wrapper').nth(i);
      await p.hover();
      await p.locator('a:has-text("Add to cart")').first().click();
      await page.click('button:has-text("Continue Shopping")');
    }
    await page.click('a[href="/view_cart"]');
    await expect(page.locator('tr[id^="product-"]')).toHaveCount(2);
  });
});

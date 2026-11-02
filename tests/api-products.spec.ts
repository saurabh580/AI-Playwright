import { test, expect } from '@playwright/test';

test.describe('API Tests @api', () => {
  test('GET productsList API', async ({ request }) => {
    const res = await request.get('https://automationexercise.com/api/productsList');
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.products.length).toBeGreaterThan(0);
  });
});

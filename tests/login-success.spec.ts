import { test, expect } from '@playwright/test';

test('Login flow on Practice Test Automation', async ({ page }) => {
  // Go directly to login page - more stable for CI/CD
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  
  await page.fill('input#username', 'student');
  await page.fill('input#password', 'Password123');
  await page.click('button#submit');

  await expect(page.locator('h1')).toContainText('Logged In Successfully');
  await expect(page).toHaveURL(/.*logged-in-successfully/);
});
import { test, expect } from '@playwright/test';

test('Login flow on Practice Test Automation', async ({ page }) => {
  // Step 1: Navigate to the practice page
  await page.goto('/');

  // Step 2: Click the link labelled "Test Login Page"
  await page.click('a[href*="practice-test-login"]');

  // Step 3: Enter username
  await page.fill('input#username', 'student');

  // Step 4: Enter password
  await page.fill('input#password', 'Password123');

  // Step 5: Click the Submit button
  await page.click('button#submit');

  // Optionally, you can add an assertion here to verify the login was successful.
});

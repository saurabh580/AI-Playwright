import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login with POM @auth @smoke', () => {
  test('Successful login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('student', 'Password123');
    await login.assertLoginSuccess();
  });

  test('Failed login - wrong password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('student', 'WrongPass');
    await login.assertLoginFailed();
  });

  test('Failed login - empty data', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('', '');
  });
});

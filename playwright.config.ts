import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 60 * 1000,
  expect: { timeout: 10000 },
  outputDir: 'test-results/',
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'test-results/junit-results.xml' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['list']
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    headless: process.env.HEADLESS !== 'false',
    ignoreHTTPSErrors: true,
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 15000,
    navigationTimeout: 30000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    launchOptions: { slowMo: process.env.CI ? 0 : 100 },
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
  ],
});

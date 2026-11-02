import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({
  path: path.resolve(__dirname, '.env'),
});

export default defineConfig({

  // Test Location
  testDir: './tests',

  // Parallel Execution
  fullyParallel: true,

  // Prevent accidental test.only in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests
  retries: process.env.CI ? 2 : 0,

  // Number of workers - 2 for Jenkins (was 4, too high for Mac)
  workers: process.env.CI ? 2 : undefined,

  // Global timeout per test
  timeout: 60 * 1000,

  // Assertion timeout
  expect: {
    timeout: 10000,
  },

  // Folder for test artifacts
  outputDir: 'test-results/',

  // Reporters
  reporter: [
    [
      'html',
      {
        open: 'never',
        outputFolder: 'playwright-report',
      },
    ],
    [
      'junit',
      {
        outputFile: 'test-results/junit-results.xml',
      },
    ],
    [
      'allure-playwright',
      {
        outputFolder: 'allure-results',
      },
    ],
    ['list'],
  ],

  // Shared Configuration
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
    launchOptions: {
      slowMo: process.env.CI ? 0 : 100,
    },
  },

  // Browser Matrix - CHROMIUM ONLY FOR PIPELINE
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // Firefox & Webkit disabled for CI - uncomment to run locally only
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
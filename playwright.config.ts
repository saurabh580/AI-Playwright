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

  // Number of workers
  workers: process.env.CI ? 4 : undefined,

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

    // Application URL
    baseURL:
      process.env.BASE_URL ||
      'https://www.saucedemo.com',

    // Browser Mode
    headless: process.env.HEADLESS !== 'false',

    // Ignore certificate issues
    ignoreHTTPSErrors: true,

    // Consistent viewport
    viewport: {
      width: 1920,
      height: 1080,
    },

    // Action Timeout
    actionTimeout: 15000,

    // Navigation Timeout
    navigationTimeout: 30000,

    // Reporting Artifacts
    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'retain-on-failure',

    // Uncomment if using saved login session
    // storageState: 'testcontexts/auth.json',

    launchOptions: {
      slowMo: process.env.CI ? 0 : 100,
    },
  },

  // Browser Matrix
  projects: [

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },

    // Optional Edge

    // {
    //   name: 'edge',
    //   use: {
    //     ...devices['Desktop Edge'],
    //     channel: 'msedge',
    //   },
    // },

    // Optional Mobile

    // {
    //   name: 'Pixel 7',
    //   use: { ...devices['Pixel 7'] },
    // },

    // {
    //   name: 'iPhone 14',
    //   use: { ...devices['iPhone 14'] },
    // },
  ],

  // Useful when app must start before tests

  /*
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
  */
});
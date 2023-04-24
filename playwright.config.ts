import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import { host } from './env';

export const STORAGE_STATE_PATH = path.join(__dirname, './storageState.json');
export default defineConfig({
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  expect: { timeout: 1000000 }, // important firefox with 5s too slow and fails
  timeout: 60000,
  use: {
    baseURL: host,
    trace: 'on-first-retry',
    actionTimeout: 20000,
    navigationTimeout: 40000,
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
    },
  },
  workers: 1,
  globalTimeout: 60 * 60 * 1000,
  projects: [
    {
      name: 'setup',
      testMatch: '**/*.setup.ts',
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE_PATH,
      },
    },
    {
      name: 'firefox',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Firefox'],
        storageState: STORAGE_STATE_PATH,
      },
    },
    {
      name: 'webkit',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Safari'],
        storageState: STORAGE_STATE_PATH,
      },
    },
  ],
});

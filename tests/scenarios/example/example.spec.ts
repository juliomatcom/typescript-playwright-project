import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://example.com/login');
  await page.waitForTimeout(5000);
  const heading = await page.getByRole('heading', { name: 'Example Domain' });
  expect(heading).toBeTruthy();
});
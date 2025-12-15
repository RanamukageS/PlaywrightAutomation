import { test } from '@playwright/test';

test('authenticate', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Save login session
  await page.context().storageState({ path: 'auth.json' });
});

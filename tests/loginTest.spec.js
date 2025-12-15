import { test, expect } from '@playwright/test';
import { validUsers, invalidUsers } from '../fixtures/loginData';

const BASE_URL = 'https://www.saucedemo.com/';

test.describe('SauceDemo Login Tests', () => {

  for (const user of validUsers) {
    test(`Login successful with ${user.username}`, async ({ page }) => {
      await page.goto(BASE_URL);
      await page.fill('#user-name', user.username);
      await page.fill('#password', user.password);
      await page.click('#login-button');
    });
  }

  for (const user of invalidUsers) {
    test(`Login fails with username: ${user.username}`, async ({ page }) => {
      await page.goto(BASE_URL);
      await page.fill('#user-name', user.username);
      await page.fill('#password', user.password);
      await page.click('#login-button');
      await expect(page.locator('h3[data-test="error"]')).toBeVisible();
    });
  }
});

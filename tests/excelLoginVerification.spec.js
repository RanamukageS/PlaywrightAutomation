// tests/excelLoginVerification.spec.js
const { test, expect } = require('@playwright/test');
const { login } = require('../utils/loginHelper.js');

// Load test data synchronously from JSON
const data = require('../testData/loginData.json');

// Skip header row and define tests synchronously
data.slice(1).forEach(([username, password]) => {
  test(`Login test for ${username}`, async ({ page }) => {
    await login(page, username, password);

    // Optional: verify something on inventory page
    const firstProduct = page.locator('.inventory_item_name').first();
    await expect(firstProduct).toBeVisible();
  });
});

/**
 * Login to SauceDemo using username and password
 * @param {import('@playwright/test').Page} page
 * @param {string} username
 * @param {string} password
 */
async function login(page, username, password) {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');

  // Wait for inventory page to confirm successful login
  await page.waitForURL('https://www.saucedemo.com/inventory.html', { timeout: 5000 });
}

module.exports = { login };

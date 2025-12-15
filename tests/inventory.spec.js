import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

test.use({ storageState: 'auth.json' });

    test('Add Items to the cart', async ({page}) => {
      await page.goto('https://www.saucedemo.com/inventory.html');
      await expect(page.locator('.inventory_list')).toBeVisible();
      const inventoryPage = new InventoryPage(page);
      await inventoryPage.addItemsToInventory();
    }
  )
  
    test('Cart Persistence Across Pages and Reset App State', async ({page}) => {
      await page.goto('https://www.saucedemo.com/inventory.html');   
      const inventoryPage = new InventoryPage(page); 
      await inventoryPage.manageItems();
    }
  )

    test.only('Sorting Functionality : Low to High', async({page})=> {
      await page.goto('https://www.saucedemo.com/inventory.html'); 
      const inventoryPage = new InventoryPage(page);
      await inventoryPage.selectLowToHighFunc();
    }
 )

    test('Sorting Functionality : High to Low', async({page}) => {
        await page.goto('https://www.saucedemo.com/inventory.html'); 
          const inventoryPage = new InventoryPage(page);
          await inventoryPage.selectHighestToLow();
    })


    test('Sorting Functionality : A to Z and  Z to A', async({page}) => {
      await page.goto('https://www.saucedemo.com/inventory.html');  
      const inventoryPage = new InventoryPage(page);  
      await inventoryPage.selectAtoZFunc();
    })

    test('Price Validation on Checkout Page', async({page}) => {
      await page.goto('https://www.saucedemo.com/inventory.html');  
      const inventoryPage = new InventoryPage(page);  
      await inventoryPage.priceValidation();
    })

    test('Validate LastNasme in checkout information', async({page}) => {
      await page.goto('https://www.saucedemo.com/inventory.html');  
      const inventoryPage = new InventoryPage(page);  
      await inventoryPage.validateLastNameCheckoutInfromation();
    })

    test('Validate FirstName in checkout information', async({page}) => {
      await page.goto('https://www.saucedemo.com/inventory.html');  
      const inventoryPage = new InventoryPage(page);  
      await inventoryPage.validateFirstNameCheckoutInfromation();
    })

    test('Validate PostalCode in checkout information', async({page}) => {
      await page.goto('https://www.saucedemo.com/inventory.html');  
      const inventoryPage = new InventoryPage(page);  
      await inventoryPage.validatePostalCodeCheckoutInfromation;
    })

    test('Validate Complete Checkout cancel', async({page}) => {  
      await page.goto('https://www.saucedemo.com/inventory.html');
      const inventoryPage = new InventoryPage(page);
      await inventoryPage.validateCompleteCheckoutCancel();
    })

    test.describe('Inventory UI Snapshot', () => {
    test.use({
      viewport: { width: 1250, height: 826 }
    })
    test('Inventory layout snapshot', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/inventory.html', {
      waitUntil: 'networkidle'
    });

    // Disable animations & transitions
    await page.addStyleTag({
    content: `
    * {
      animation: none !important;
      transition: none !important;
    }
  `
  });
     // Wait for core element to be stable
    const inventorySection = page.locator('#inventory_container').first();
    await inventorySection.waitFor();

        // Force element to fixed size to avoid layout differences
    await inventorySection.evaluate(el => {
    el.style.width = '1250px';
    el.style.height = '826px';
    });

      // Scroll to top to ensure consistent screenshot
    await page.evaluate(() => window.scrollTo(0, 0));
    const screenshot = await inventorySection.screenshot({ animations: 'disabled' });
    expect(screenshot).toMatchSnapshot('inventory-layout.png', { maxDiffPixelRatio: 0.05 });

    });

    

});

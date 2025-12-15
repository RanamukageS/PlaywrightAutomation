const { expect } = require("allure-playwright");

exports.InventoryPage = class InventoryPage {
  constructor(page) {
    this.page = page;

    this.addBackPack = page.locator('#add-to-cart-sauce-labs-backpack');
    this.addByicLight = page.locator('#add-to-cart-sauce-labs-bike-light');
    this.shoppingCart = page.locator('[data-test = "shopping-cart-link"]');
    this.checkOut = page.locator('#checkout');
    this.addFirstname = page.locator('#first-name');
    this.addLastName = page.locator('#last-name');
    this.addPostCode = page.locator('#postal-code');
    this.clickContinue = page.locator('#continue');
    this.CheckoutCancel = page.locator('#cancel');
    this.clickFinish = page.locator('#finish');
    this.checkTextmessage =page.locator('[data-test = "complete-text"]');
    this.addTShirt = page.locator('[data-test = "add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.addFleeceJacket = page.locator('[data-test = "add-to-cart-sauce-labs-fleece-jacket"]');
    this.cartBadge = page.locator('[data-test = "shopping-cart-badge"]');
    this.sideBarMain = page.locator('#react-burger-menu-btn');
    this.ResetAppSideBar = page.locator('[data-test = "reset-sidebar-link"]');
    this.shopingCartLink = page.locator('[data-test = "shopping-cart-link"]');
    this.optionsDropdown = page.locator('[data-test = "product-sort-container"]').click();
    this.optionLowtoHigh = page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  
    this.lowestItem = page.locator('[data-test = "inventory-item-name"]').first();
    this.HighToLow = page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    this.highestItem = page.locator('[data-test = "inventory-item-name"]').first();
    this.AtoZ  = page.locator('[data-test="product-sort-container"]').selectOption('az');
    this.ZtoA = page.locator('[data-test="product-sort-container"]').selectOption('za');
    this.startedFromAtoZItem = page.locator('[data-test = "inventory-item-name"]').first();
    this.startedFromZtoAItem = page.locator('[data-test = "inventory-item-name"]').first();
    this.getItemTotal = page.locator('[data-test = "subtotal-label"]');
    this.getTaxAmount = page.locator('[data-test = "tax-label"]');
    this.checkErrorMessage = page.locator('h3[data-test="error"]');



    this.optionsDropdown = page.locator('[data-test="product-sort-container"]');
    this.productPrices = page.locator('.inventory_item_price');
    this.firstProductName = page.locator('.inventory_item_name').first();



  }

  //Add items
  async addItemsToInventory() {
    await this.addBackPack.click();
    await this.addByicLight.click();
    await this.shoppingCart.click();
    await this.checkOut.click();
    await this.page.waitForURL('https://www.saucedemo.com/checkout-step-one.html');
    await this.addFirstname.fill('Shashika');
    await this.addLastName.fill('Ranamuka');
    await this.addPostCode.fill('3000');
    await this.clickContinue.click();
    await this.clickFinish.click();
    await this.page.waitForURL('https://www.saucedemo.com/checkout-complete.html');   
  }

  //Reset App State
  async manageItems(){
    await this.addTShirt.click();
    await this.addFleeceJacket.click();
    const itemsToAdd = ["Sauce Labs Bolt T-Shirt", "Sauce Labs Fleece Jacket"];
    const expectedCount = itemsToAdd.length.toString();
    await expect(this.cartBadge).toHaveText(expectedCount);
    await this.sideBarMain.click();
    await this.ResetAppSideBar.click();
    await expect(this.page.locator('.cart_item')).toHaveCount(0);
  }

  //Sorting Functionality : Low to High
  async selectLowToHighFunc(){
    await this.optionsDropdown.waitFor({ state: 'visible' });

    // Select low → high
    await this.page.selectOption('[data-test="product-sort-container"]', 'lohi');

    // Wait for products to render
    await this.firstProductName.waitFor({ state: 'visible' });

    // Get prices and convert to numbers
    const prices = (await this.productPrices.allTextContents())
      .map(p => parseFloat(p.replace('$', '')));

    // Check ascending order
    if (!prices.every((v, i, arr) => i === 0 || arr[i - 1] <= v)) {
      throw new Error('Products not sorted low → high');
    }

    // Ensure first product is the lowest
    if (prices[0] !== Math.min(...prices)) {
      throw new Error('First product is not the lowest-priced item');
    }
  }
  


  //Sorting Functionality : High to Low 
  async selectHighestToLow(){
  await this.optionsDropdown.waitFor({ state: 'visible' });
  await this.page.selectOption('[data-test="product-sort-container"]','hilo');
  await this.firstProductName.waitFor({ state: 'visible' });
  const prices = (await this.productPrices.allTextContents())
    .map(p => parseFloat(p.replace('$', '')));
  if (!prices.every((v, i, arr) => i === 0 || arr[i - 1] >= v)) {
    throw new Error('Products not sorted high → low');
  }
  if (prices[0] !== Math.max(...prices)) {
    throw new Error('First product is not the highest-priced item');
  }
    }
  
  
  //Sorting Functionality : A to Z and Z to A
  async selectAtoZFunc(){
    await this.page.selectOption('[data-test="product-sort-container"]', 'az');
    const firstItemAZ = this.page.locator('.inventory_item_name').first();
    await expect(firstItemAZ).toHaveText("Sauce Labs Backpack");
    await this.page.selectOption('[data-test="product-sort-container"]', 'za');
    const firstItemZA = this.page.locator('.inventory_item_name').first();
    await expect(firstItemZA).toHaveText("Test.allTheThings() T-Shirt (Red)");
  }

  //Price Validation
  async priceValidation(){
    await this.addBackPack.click();
    await this.addByicLight.click();
    await this.addFleeceJacket.click();
    await this.shoppingCart.click();
    await this.checkOut.click();
    await this.page.waitForURL('https://www.saucedemo.com/checkout-step-one.html');
    await this.addFirstname.fill('Shashika');
    await this.addLastName.fill('Ranamuka');
    await this.addPostCode.fill('3000');
    await this.clickContinue.click();
    await this.page.waitForURL('https://www.saucedemo.com/checkout-step-two.html');
    await expect(this.getItemTotal).toHaveText('Item total: $89.97');
    await expect(this.getTaxAmount).toHaveText('Tax: $7.20');
    await expect(this.page.locator('[data-test = "total-label"]')).toHaveText('Total: $97.17');
    await this.clickFinish.click();
    await this.page.waitForURL('https://www.saucedemo.com/checkout-complete.html');
  }

  async validateLastNameCheckoutInfromation(){
    await this.addFleeceJacket.click();
    await this.shoppingCart.click();
    await this.checkOut.click();
    await this.page.waitForURL('https://www.saucedemo.com/checkout-step-one.html');
    await this.addFirstname.fill('Shashika');
    await this.addLastName.fill('');
    await this.addPostCode.fill('');
    await this.clickContinue.click();
    await expect(this.checkErrorMessage).toHaveText('Error: Last Name is required');
}

  async validateFirstNameCheckoutInfromation(){
    await this.addFleeceJacket.click();
    await this.shoppingCart.click();
    await this.checkOut.click();
    await this.page.waitForURL('https://www.saucedemo.com/checkout-step-one.html');
    await this.addFirstname.fill('');
    await this.addLastName.fill('Ranamuka');
    await this.addPostCode.fill('');
    await this.clickContinue.click();
    await expect(this.checkErrorMessage).toHaveText('Error: First Name is required');
}

  async validatePostalCodeCheckoutInfromation(){
    await this.addFleeceJacket.click();
    await this.shoppingCart.click();
    await this.checkOut.click();
    await this.page.waitForURL('https://www.saucedemo.com/checkout-step-one.html');
    await this.addFirstname.fill('Shashika');
    await this.addLastName.fill('Ranamuka');
    await this.addPostCode.fill('');
    await this.clickContinue.click();
    await expect(this.checkErrorMessage).toHaveText('Error: Postal Code is required');
}


async validateCompleteCheckoutCancel(){  
    await this.addFleeceJacket.click();
    await this.shoppingCart.click();
    await this.page.waitForURL('https://www.saucedemo.com/cart.html');
    await this.checkOut.click();
    await this.page.waitForURL('https://www.saucedemo.com/checkout-step-one.html');
    await this.addFirstname.fill('Shashika');
    await this.addLastName.fill('Ranamuka');
    await this.addPostCode.fill('3000');
    await this.clickContinue.click();
    await this.page.waitForURL('https://www.saucedemo.com/checkout-step-two.html');
    //await this.page.CheckoutCancel.click();
    await this.page.click('#cancel');
    await this.page.waitForURL('https://www.saucedemo.com/inventory.html');
}


async checkSnapshot(){
    await expect(this.page).toHaveScreenshot();
  }
  
}
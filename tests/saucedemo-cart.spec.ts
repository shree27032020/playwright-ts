import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Shopping cart', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('add one item to the cart', async ({ page }) => {
    await inventoryPage.addFirstItemToCart()

    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('remove an item from the cart', async ({ page }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.openCart();
    await cartPage.removeFirstItem();

    await expect(cartPage.cartItems).toHaveCount(0);
  });
});
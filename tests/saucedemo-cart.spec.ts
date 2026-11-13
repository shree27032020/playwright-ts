import { test, expect } from '../fixtures/pages';

test.describe('Shopping cart', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('add one item to the cart', async ({ inventoryPage }) => {
    await inventoryPage.addFirstItemToCart();

    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('remove an item from the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.openCart();
    await cartPage.removeFirstItem();

    await expect(cartPage.cartItems).toHaveCount(0);
  });
});
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();
  });

  test('user can complete a purchase', async () => {
    await checkoutPage.fillDetails('Asha', 'Kumar', '641001');
    await checkoutPage.finishButton.click();

    await expect(checkoutPage.confirmationHeader).toContainText('Thank you for your order');
  });

  test('shows an error when first name is empty', async () => {
    await checkoutPage.fillDetails('', 'Kumar', '641001');

    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });

  test('shows an error when postal code is empty', async () => {
    await checkoutPage.fillDetails('Sri', 'Kumar', '');

    await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
  });

  test('shows an error when last name is empty', async () => {
  await checkoutPage.fillDetails('Sri', '', '641001');

  await expect(checkoutPage.errorMessage).toContainText('Last Name is required');
});
});
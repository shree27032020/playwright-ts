import { test, expect } from '../fixtures/pages';

test.describe('Checkout', () => {
  test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();
  });

  test('user can complete a purchase', async ({ checkoutPage }) => {
    await checkoutPage.fillDetails('Asha', 'Kumar', '641001');
    await checkoutPage.finishButton.click();

    await expect(checkoutPage.confirmationHeader).toContainText('Thank you for your order');
  });

  test('shows an error when first name is empty', async ({ checkoutPage }) => {
    await checkoutPage.fillDetails('', 'Kumar', '641001');

    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });

  test('shows an error when last name is empty', async ({ checkoutPage }) => {
    await checkoutPage.fillDetails('Sri', '', '641001');

    await expect(checkoutPage.errorMessage).toContainText('Last Name is required');
  });

  test('shows an error when postal code is empty', async ({ checkoutPage }) => {
    await checkoutPage.fillDetails('Sri', 'Kumar', '');

    await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
  });
});
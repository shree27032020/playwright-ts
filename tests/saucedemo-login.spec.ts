import { test, expect } from '../fixtures/pages';
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('standard user can log in', async ({ page, loginPage }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });
  
  test('locked out user sees an error', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  test('wrong password shows an error', async ({ loginPage }) => {
    await loginPage.login('standard_user', 'wrong_password');
    await expect(loginPage.errorMessage).toContainText('do not match');
  });
});
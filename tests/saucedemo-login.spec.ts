import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  let loginPage: LoginPage;                  // declared once, visible to everything below

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);         // no "const" here
    await loginPage.goto();
  });

  test('standard user can log in', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });
  
  test('locked out user sees an error', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  test('wrong password shows an error', async () => {
    await loginPage.login('standard_user', 'wrong_password');
    await expect(loginPage.errorMessage).toContainText('do not match');
  });
});
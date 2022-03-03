import { expect } from '@playwright/test';
import { test} from '../../umbraco/helpers';
import { umbracoConfig } from '../../umbraco.config';
test.describe('Login', () => {
    test.beforeEach(async ({ page, umbracoApi }) => {
        await page.goto('https://localhost:44331/umbraco');
    });
    test('Login with correct username and password', async ({page}) => {
      const username = "nge@umbraco.dk";
      const password = "1234567890";

      let error = page.locator('.text-error');
      await expect(error).toBeHidden();

      // Action
      await page.fill('#umb-username', username);
      await page.fill('#umb-passwordTwo', password);
      await page.locator('[label-key="general_login"]').click();
      await page.waitForNavigation();

      // Assert
      await expect(page).toHaveURL('https://localhost:44331/umbraco#/content');
      let usernameField = await page.locator('#umb-username');
      let passwordField = await page.locator('#umb-passwordTwo');
      await expect(usernameField).toHaveCount(0);
      await expect(passwordField).toHaveCount(0);
    });

    test('Login with correct username but wrong password', async({page}) => {
      const username = umbracoConfig.user.login;
      const password = 'wrong';

      // Precondition
      let error = page.locator('.text-error');
      await expect(error).toBeHidden();

      // Action
      await page.fill('#umb-username', username);
      await page.fill('#umb-passwordTwo', password);
      await page.locator('[label-key="general_login"]').click();

      // Assert
      let usernameField = await page.locator('#umb-username');
      let passwordField = await page.locator('#umb-passwordTwo');
      await expect(error).toBeVisible();
      await expect(usernameField).toBeVisible();
      await expect(passwordField).toBeVisible();
    });

    test('Login with wrong username and wrong password', async({page}) => {
      const username = 'wrong-username';
      const password = 'wrong';

      // Precondition
      let error = page.locator('.text-error');
      await expect(error).toBeHidden();

      // Action
      await page.fill('#umb-username', username);
      await page.fill('#umb-passwordTwo', password);
      await page.locator('[label-key="general_login"]').click();

      // Assert
      let usernameField = await page.locator('#umb-username');
      let passwordField = await page.locator('#umb-passwordTwo');
      await expect(error).toBeVisible();
      await expect(usernameField).toBeVisible();
      await expect(passwordField).toBeVisible();
    });
});
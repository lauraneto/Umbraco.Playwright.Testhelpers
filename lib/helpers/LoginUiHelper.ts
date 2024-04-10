import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class LoginUiHelper extends UiBaseLocators {
  private readonly emailTxt: Locator;
  private readonly passwordTxt: Locator;
  private readonly loginBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.emailTxt = page.locator('[name="username"]');
    this.passwordTxt = page.locator('[name="password"]');
    this.loginBtn = page.getByLabel('Login'); 
  }

  async enterEmail(email: string) {
    await expect(this.emailTxt).toBeVisible({timeout: 20000});
    await this.emailTxt.clear();
    await this.emailTxt.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordTxt.clear();
    await this.passwordTxt.fill(password);
  }

  async clickLoginButton() {
    await this.loginBtn.click();
  }
}

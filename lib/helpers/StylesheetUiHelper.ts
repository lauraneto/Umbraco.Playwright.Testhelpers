import {Page, Locator} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class StylesheetUiHelper extends UiBaseLocators{
  private readonly newStylesheetBtn: Locator;
  private readonly stylesheetNameTxt: Locator;
  private readonly addRuleBtn: Locator;
  private readonly ruleNameTxt: Locator;
  private readonly ruleSelectorTxt: Locator;
  private readonly ruleStylesTxt: Locator;
  private readonly newRichTextEditorStylesheetBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.stylesheetNameTxt = page.getByLabel('stylesheet name');
    this.addRuleBtn = page.getByLabel('Add rule');
    this.ruleNameTxt = page.getByLabel('Rule name');
    this.ruleSelectorTxt = page.getByLabel('Rule selector');
    this.ruleStylesTxt = page.getByLabel('Rule styles');
    this.newStylesheetBtn = page.getByLabel('New Stylesheet');
    this.newRichTextEditorStylesheetBtn = page.getByLabel('New Rich Text Editor Stylesheet');
  }

  async clickActionsMenuForStylesheet(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForStylesheet("Stylesheets");
  }

  async clickRootFolderCaretButton() {
    await this.clickCaretButtonForName("Stylesheets");
  }

  async clickNewStylesheetButton() {
    await this.newStylesheetBtn.click();
  }
  
  async clickNewRichTextEditorStylesheetButton() {
    await this.newRichTextEditorStylesheetBtn.click();
  }

  async enterStylesheetName(stylesheetName: string) {
    await this.stylesheetNameTxt.clear();
    await this.stylesheetNameTxt.fill(stylesheetName);
  }
  
  async enterStylesheetContent(stylesheetContent: string) {
    await this.textAreaInputArea.clear();
    await this.textAreaInputArea.fill(stylesheetContent);
  }

  async addNewRule(ruleName: string, ruleSelector: string, ruleStyles: string) {
    await this.addRuleBtn.click();
    await this.ruleNameTxt.clear();
    await this.ruleNameTxt.fill(ruleName);
    await this.ruleSelectorTxt.clear();
    await this.ruleSelectorTxt.fill(ruleSelector);
    await this.ruleStylesTxt.clear();
    await this.ruleStylesTxt.fill(ruleStyles);
    await this.clickSubmitButton();
  }

  async openStylesheetByNameAtRoot(stylesheetName: string) {
    await this.clickRootFolderCaretButton();
    await this.page.getByLabel(stylesheetName).click();
  }

  async deleteStylesheet() {
    await this.clickDeleteButton();
    await this.clickConfirmToDeleteButton();
  }
}
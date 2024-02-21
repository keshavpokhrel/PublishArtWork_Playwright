import { Page } from "@playwright/test";

export class LoginPage {
    [x: string]: any;
    page: Page;
    constructor(page: Page) {
        this.page = page;
        this.loginRedirectionButton = page.locator("//a[text()='Login']");
        this.loginButton = page.locator("//button//p[text()='Login']");
        this.emailTextBox = page.locator("//input[@id='email']");
        this.passwordTextBox = page.locator("//input[@id='password']");
        this.mobileMenueExpand = page.locator("(//button[@aria-label='Toggle Menu'])[1]")
        this.artworkLink = page.locator(`//a[contains(@class,"flex items-center sm:mb-4 lg:mb-0 py-2 lg:py-0") and @href='/artworks']`);
    }
    async gotoFunction() {
        await this.page.goto('/');
        await this.page.waitForLoadState('networkidle')
        await this.loginRedirectionButton.waitFor({ state: 'visible' });
    }

    async enterDetailsAndLogin(username, passowrd, isMobile) {
        await this.loginRedirectionButton.waitFor({ state: 'visible' });
        await this.loginRedirectionButton.click();
        await this.loginButton.waitFor({ state: 'visible' });
        await this.emailTextBox.waitFor({ state: 'attached' });
        await this.emailTextBox.click();
        await this.emailTextBox.fill(username);
        await this.passwordTextBox.click();
        await this.passwordTextBox.fill(passowrd);
        await this.loginButton.click();
        if (isMobile) {
            await this.mobileMenueExpand.waitFor({ state: 'visible' });
        } else {
            await this.artworkLink.waitFor({ state: 'visible' });
        }
    }
}


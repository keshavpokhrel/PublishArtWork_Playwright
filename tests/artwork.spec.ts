import { test, expect, chromium, firefox, Page, BrowserContext, Browser } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import constants from '../test-data/constants.json'
import { HomePage } from '../pages/homepage.page';
import { ReviewArtWorkPage } from '../pages/reviewartwork.page';
let data = constants;

test.describe.serial('Publish Art', async () => {
   let page: Page;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
    });

  test('login', async ({isMobile}) => {
    try {
      let pageClass = new LoginPage(page);
      await pageClass.gotoFunction();
      await pageClass.enterDetailsAndLogin(data.username, data.password, isMobile);
    } catch (error) {
      let message = (await error as Error).message;
      console.log(message);
    }
  })

  test('create artwork', async ({isMobile}) => {
    try {
      let homePage = new HomePage(page);
      await homePage.createNewArtWork(isMobile);
    } catch (error) {
      let message = (await error as Error).message;
      console.log(message);
    }
  })

  test('verify artwork', async () => {
    try {
      let verifyPage = new HomePage(page);
      await verifyPage.verifyCreatedArtWork();
    } catch (error) {
      let message = (await error as Error).message;
      console.log(message);
    }  }
  )

  test('write review', async () => {
    try {
      let pageClass = new ReviewArtWorkPage(page);
      await pageClass.reviewArtWork();
    } catch (error) {
      let message = (await error as Error).message;
      console.log(message);
    }
  })

   test.afterAll(async ({ browser }) => {
        browser.close;
    });
})

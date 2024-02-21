import { Page, expect } from "@playwright/test";
import constants from '../test-data/constants.json'

export class ReviewArtWorkPage {
    [x: string]: any;
    page: Page;
    constructor(page: Page) {
        this.publishedArtworkName = page.locator("//div[@id='artworks-list']//h3")
        this.publishedArtworkImageLink = page.locator("(//div[@id='artworks-list']//img)[1]");
        this.dotDropdown = page.locator("//button[@id='dropdownButton']");
        this.reviewsTab = page.locator("//button[contains(@id,'trigger-review')]")
        this.reviewTitle = page.locator("#review-title")
        this.reviewDetail = page.locator("#review-detail")
        this.sbumitButton = page.locator("#review-detail+button")
        this.submittedTitle = page.locator("//h5")
        this.submittedDetail = page.locator("//h5/../div/p")
    }

    async reviewArtWork() {
        await this.publishedArtworkName.nth(0).waitFor({ state: 'visible' });
        //done this verify publish artwork name in parallel run as well
        for (const element of await this.publishedArtworkName.elementHandles()) {
            const artName = await element.textContent();
            if (artName === newArtworkName) {
                await element.click();
                break;
            }
        }
        await this.dotDropdown.waitFor({ state: 'visible' })
        await this.reviewsTab.click()
        await this.reviewTitle.waitFor({ state: 'visible' })
        await this.reviewTitle.click()
        await this.reviewTitle.fill(constants.reviewTitle)
        await this.reviewTitle.click()
        await this.reviewDetail.fill(constants.reviewDetail)
        await this.sbumitButton.click()
        //In case of multiple review hardcoded to first element as recent review comes on top.
        await this.submittedTitle.nth(0).waitFor({ state: 'visible' })
        await expect(await this.submittedTitle.nth(0)).toContainText(constants.reviewTitle)
        await expect(await this.submittedDetail.nth(0)).toContainText(constants.reviewDetail)
    }
}
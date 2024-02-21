import { Page, expect } from "@playwright/test";
import constants from '../test-data/constants.json';

export class HomePage {
    [x: string]: any;
    page: Page;
    constructor(page: Page) {
        this.page = page;
        this.mobileArtWorkLink = page.locator("//a[contains(@class,'flex items-center py-2') and @href='/artworks']")
        this.artworkLink = page.locator("//a[contains(@class,'flex items-center sm:mb-4 lg:mb-0 py-2 lg:py-0') and @href='/artworks']");
        this.addArtWorkLink = page.locator("//a[text()='Add Artwork']");
        this.artworkNameTextBox = page.locator("//input[@id='artwork_name']");
        this.editionDropDown = page.locator("//button[contains(@id,'headlessui-listbox-button-:')]//span[contains(text(),'Select Edition Type')]");
        this.editionOptionList = page.locator("//ul[contains(@id,'headlessui-listbox-options-:')]//li")
        this.howManyEdition = page.locator("//input[@id='edition_number']")
        this.descriptionText = page.locator("//p[text()='Description *']//following-sibling::div//div[@contenteditable='true']")
        this.currentPrictText = page.locator("//input[@id='current_price']")
        this.currencyTypeDropDown = page.locator("//input[@id='current_price']//following-sibling::div[2]")
        this.cuttrncyRadioOptions = page.locator("//input[@id='current_price']//following-sibling::div[2]//input[@type='radio']")
        this.primarySalePriceText = page.locator("//input[@id='primary_sale_price']")
        this.primarySalePriceDropDown = page.locator("//input[@id='primary_sale_price']//following-sibling::div[2]")
        this.primarySalePriceRadioBox = page.locator("//input[@id='primary_sale_price']//following-sibling::div[2]//input[@type='radio']")
        this.primarySaleDateElement = page.locator("//p[text()='Date At Primary Sale']//following-sibling::button[1]")
        this.allowedDateElements = page.locator("//button[@class='rdp-button_reset rdp-button h-9 w-9 p-0 font-normal aria-selected:opacity-100']");
        this.primarySaleBuyerText = page.locator("//label[contains(text(),'Primary Sale Buyer')]//following-sibling::div//input");
        this.styleOfArtworkDropDown = page.locator("//label[contains(text(),'Style Of Artwork *')]//following-sibling::div")
        this.styleOfArtWorkRadioBox = page.locator("//div[contains(@id,'react-select-') and @role='listbox']//input")
        this.nftGenesisDropDown = page.locator("//div[contains(text(),'Select NFT Genesis')]//following-sibling::div")
        this.nftGenesisRadioBox = page.locator("//div[contains(@id,'react-select-') and @role='listbox']//input")
        this.supplyDropDown = page.locator("//label[contains(text(),'Supply *')]//following-sibling::div")
        this.supplyRadioBox = page.locator("//div[contains(@id,'react-select-') and @role='listbox']//input")
        this.collabratorText = page.locator("//div[contains(text(),'Username or Email address')]//following-sibling::div//input")
        this.collabratorCreateDropDown = page.locator("//label[text()='Collaborator']//following-sibling::div//div[contains(@id,'-listbox')]")
        this.ownedByText = page.locator("//label[contains(text(),'Owned By')]//..//input[@placeholder='Username or Email address']")
        this.marketplaceMintedOnDropDown = page.locator("//p[contains(text(),'The Marketplace Minted On')]//following-sibling::div")
        this.marketplaceMintedOnListOption = page.locator("//ul[contains(@id,'headlessui-listbox-options-:')]//li")
        this.marketplaceUrl = page.locator("//input[@id='url']")
        this.mintedOnDatePicker = page.locator("//p[text()= 'Minted On']//following-sibling::button")
        this.allowedMintedOnDate = page.locator("//table//button[@class ='rdp-button_reset rdp-button h-9 w-9 p-0 font-normal aria-selected:opacity-100']")
        this.createdOnDatePicker = page.locator("//p[contains(text(),'Created On *')]/..//button")
        this.allowedCreatedOnDate = page.locator("//table//button[@class ='rdp-button_reset rdp-button h-9 w-9 p-0 font-normal aria-selected:opacity-100']")
        this.currentCreatedOnDate = page.locator("//table[@class='w-full border-collapse space-y-1']//button[contains(@class,' dark:bg-neutral-800 dark:text-neutral-50')]")
        this.copywrightSelect = page.locator("//span[contains(text(),'Select copyright')]/../..")
        this.copywrightSelectOption = page.locator("//ul[contains(@id,'headlessui-listbox-options-:')]//li")
        this.artistRoyalityYesRadio = page.locator("//input[@name='artist_loyalty' and @value='1']")
        this.artistRoyalityNoRadio = page.locator("//input[@name='artist_loyalty' and @value='0']")
        this.artistRoyalityPercentageText = page.locator("//input[@id='artist_loyalty_percentage']")
        this.physicalPiecYesRadio = page.locator("//input[@name='physical_piece' and @value='1']")
        this.physicalPiecNoRadio = page.locator("//input[@name='physical_piece' and @value='0']")
        this.publishButton = page.locator("//button[contains(text(),'Publish')]")
        this.publishedArtworkName = page.locator("//div[@id='artworks-list']//h3")
        this.mobileMenueExpand = page.locator("(//button[@aria-label='Toggle Menu'])[1]")
    }


    async createNewArtWork(isMobile: boolean) {
        if (isMobile) {
            await this.mobileMenueExpand.waitFor({ state: 'visible' });
            await this.mobileMenueExpand.click()
            await this.mobileArtWorkLink.waitFor({ state: 'visible' });
            await this.mobileArtWorkLink.click();
        } else {
            await this.artworkLink.waitFor({ state: 'visible' });
            await this.artworkLink.click();
        }
        await this.addArtWorkLink.waitFor({ state: 'visible' });
        await this.addArtWorkLink.click();
        await this.artworkNameTextBox.waitFor({ state: 'visible' });
        globalThis.newArtworkName = constants.artworkName + await this.generateRandomString(5);
        await this.artworkNameTextBox.fill(newArtworkName);
        await this.editionDropDown.click()
        await this.editionOptionList.nth(0).waitFor({ state: 'visible' })
        //check in case of multiple edition
        const indexValue = Math.floor(Math.random() * await this.editionOptionList.count());
        const selectValue: string = await this.editionOptionList.nth(indexValue).textContent();
        await this.editionOptionList.nth(indexValue).click()
        if (selectValue === constants.editionToCheck) {
            await this.howManyEdition.waitFor({ state: 'visible' })
            await this.howManyEdition.fill(constants.howManyEdition)
        }
        await this.descriptionText.fill(constants.artworkDescription)
        await this.currentPrictText.fill(constants.currentPrice)
        await this.currencyTypeDropDown.click();
        await this.cuttrncyRadioOptions.nth(0).waitFor({ state: 'visible' })
        await this.cuttrncyRadioOptions.nth(Math.floor(Math.random() * await this.cuttrncyRadioOptions.count())).click()
        await this.primarySalePriceText.fill(constants.primarySalePrice)
        await this.primarySalePriceDropDown.click()
        await this.primarySalePriceRadioBox.nth(0).waitFor({ state: 'visible' })
        await this.primarySalePriceRadioBox.nth(Math.floor(Math.random() * await this.primarySalePriceRadioBox.count())).click();
        await this.primarySaleDateElement.click()
        await this.allowedDateElements.nth(0).waitFor({ state: 'visible' })
        await this.allowedDateElements.nth(Math.floor(Math.random() * await this.allowedDateElements.count())).click()
        await this.primarySaleBuyerText.fill(constants.primarySaleBuyerText)
        await this.page.locator("//div[@class='w-full h-full mx-auto bg-contain bg-no-repeat bg-center']//input").setInputFiles(constants.uploadFilePath);
        await this.styleOfArtworkDropDown.click();
        await this.styleOfArtWorkRadioBox.nth(0).waitFor({ state: 'visible' })
        await this.styleOfArtWorkRadioBox.nth(Math.floor(Math.random() * await this.styleOfArtWorkRadioBox.count())).click()
        await this.nftGenesisDropDown.click();
        await this.nftGenesisRadioBox.nth(0).waitFor({ state: 'visible' })
        await this.nftGenesisRadioBox.nth(Math.floor(Math.random() * await this.nftGenesisRadioBox.count())).click()
        await this.supplyDropDown.click();
        await this.supplyRadioBox.nth(0).waitFor({ state: 'visible' })
        await this.supplyRadioBox.nth(Math.floor(Math.random() * await this.supplyRadioBox.count())).click()
        await this.collabratorText.fill(constants.collaborator);
        await this.collabratorCreateDropDown.waitFor({ state: 'visible' })
        await this.collabratorCreateDropDown.click()
        await this.ownedByText.fill(constants.ownedByText);
        await this.marketplaceMintedOnDropDown.click()
        await this.marketplaceMintedOnListOption.nth(0).waitFor({ state: 'visible' })
        await this.marketplaceMintedOnListOption.nth(Math.floor(Math.random() * await this.marketplaceMintedOnListOption.count())).click();
        await this.marketplaceUrl.fill(constants.marketplaceURL);
        await this.mintedOnDatePicker.click();
        await this.allowedMintedOnDate.nth(0).waitFor({ state: 'visible' })
        await this.allowedMintedOnDate.nth(Math.floor(Math.random() * await this.allowedMintedOnDate.count())).click();
        await this.createdOnDatePicker.click();
        await this.allowedCreatedOnDate.nth(0).waitFor({ state: 'visible' })
        await this.allowedCreatedOnDate.nth(Math.floor(Math.random() * await this.allowedCreatedOnDate.count())).click();
        await this.copywrightSelect.click();
        await this.copywrightSelectOption.nth(0).waitFor({ state: 'visible' });
        await this.copywrightSelectOption.nth(Math.floor(Math.random() * await this.copywrightSelectOption.count())).click();
        await this.artistRoyalityYesRadio.click();
        await this.artistRoyalityPercentageText.waitFor({ state: 'visible' });
        await this.artistRoyalityPercentageText.fill(constants.artistRoyalityPercentage);
        await this.physicalPiecNoRadio.click();
        await this.publishButton.scrollIntoViewIfNeeded();
        await this.publishButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyCreatedArtWork() {
        await this.page.waitForLoadState('networkidle');
        await this.addArtWorkLink.waitFor({ state: 'visible' });
        let verifyArt: boolean = false;
        //done this verify publish artwork name in parallel run as well
        for (const element of await this.publishedArtworkName.elementHandles()) {
            const artName = await element.textContent();
            if (artName === newArtworkName) {
                verifyArt = true;
                break;
            }
        }
        await expect(verifyArt).toBeTruthy();
    }

    async generateRandomString(n: any) {
        let randomString = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < n; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return randomString;
    }

}
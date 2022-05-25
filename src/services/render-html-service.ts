import {Browser, Page, PDFOptions, PuppeteerNode} from 'puppeteer';

import {IRenderHtmlService} from '../interfaces/render-html-service';

export class RenderHtmlService implements IRenderHtmlService {
  private launchBrowser(): Promise<Browser> {
    return this.puppeteer.launch({headless: true});
  }

  private async getHtmlPage(
    browser: Browser,
    htmlTemplate: string
  ): Promise<Page> {
    const page: Page = await browser.newPage();

    await page.setContent(htmlTemplate);

    return page;
  }

  public async toPdf(
    htmlTemplate: string,
    options?: PDFOptions
  ): Promise<Buffer> {
    const browser = await this.launchBrowser();

    const page: Page = await this.getHtmlPage(browser, htmlTemplate);

    const pdfBuffer = await page.pdf(options);

    await page.close();
    await browser.close();

    return pdfBuffer;
  }

  constructor(private puppeteer: PuppeteerNode) {}

  static make(): IRenderHtmlService {
    const puppeteer: PuppeteerNode = require('puppeteer');

    return new RenderHtmlService(puppeteer);
  }
}

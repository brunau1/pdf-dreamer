import { Browser, Page, PDFOptions, PuppeteerNode } from 'puppeteer';

import { IRenderHtmlService } from '../interfaces/render-html-service';

export class RenderHtmlService implements IRenderHtmlService {
	public async toPdf(
		htmlTemplate: string,
		options?: PDFOptions
	): Promise<Buffer> {
		const puppeteer = await this.getPuppeteer();
		const browser: Browser = await puppeteer.launch({ headless: true });
		const page: Page = await browser.newPage();

		await page.setContent(htmlTemplate);

		const pdfBuffer = await page.pdf(options);

		await page.close();
		await browser.close();

		return pdfBuffer;
	}
	private getPuppeteer() {
		return new Promise<PuppeteerNode>((resolve, reject) => {
			const puppeteer = require('puppeteer');
			resolve(puppeteer);
		});
	}

	static make(): IRenderHtmlService {
		return new RenderHtmlService();
	}
}
